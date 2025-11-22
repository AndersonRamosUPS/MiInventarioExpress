const { validationResult } = require("express-validator");
const Producto = require("../models/Producto");

//Revisa los errores de expresss-validator (body)
function manejarValidacion(req) {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const error = new Error("Los datos enviados no son válidos");
    error.status = 400; //400 por validacion
    error.details = errores.array();
    throw error;
  }
}

//Normaliza nombres en español- ingles
function normalizarBodyProducto(req) {
  const cuerpo = req.body || {};

  if (cuerpo.name && !cuerpo.nombre) cuerpo.nombre = cuerpo.name;
  if (cuerpo.description && !cuerpo.descripcion)
    cuerpo.descripcion = cuerpo.description;
  if (cuerpo.price && !cuerpo.precio) cuerpo.precio = cuerpo.price;
  if (cuerpo.imageUrl && !cuerpo.imagen) cuerpo.imagen = cuerpo.imageUrl;
  if (cuerpo.categoryId && !cuerpo.categoriaId)
    cuerpo.categoriaId = cuerpo.categoryId;

  if (
    cuerpo.stock !== undefined &&
    cuerpo.stock !== null &&
    cuerpo.stock !== ""
  ) {
    cuerpo.stock = Number(cuerpo.stock);
  }

  req.body = cuerpo;
}

//Crear producto: POST /api/products
async function crearProducto(req, res, next) {
  try {
    normalizarBodyProducto(req);
    manejarValidacion(req);

    const datos = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoriaId: req.body.categoriaId || null,
      stock: req.body.stock ?? 0,
    };

    // Si viene archivo de imagen (desde formulario HTML)
    if (req.file) {
      datos.imagen = req.file.filename;
    }

    const nuevoProducto = new Producto(datos);
    const productoGuardado = await nuevoProducto.save();

    // toJSON del modelo-> devuelve campos en inglés
    res.status(201).json(productoGuardado);
  } catch (error) {
    next(error);
  }
}

//Listar productos: GET /api/products
async function listarProductos(req, res, next) {
  try {
    const productos = await Producto.find();
    res.json(productos); // aplica toJSON -> nombres en inglés
  } catch (error) {
    next(error); // llegara como 500 si es inesperado
  }
}

//Obtener un producto por ID: GET /api/products/:id
async function obtenerProducto(req, res, next) {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      //404 si no existe
      return res
        .status(404)
        .json({ ok: false, mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    next(error);
  }
}

//Actualizar: PUT /api/products/:id
async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;

    normalizarBodyProducto(req);
    manejarValidacion(req);

    const datos = {};

    if (req.body.nombre !== undefined) datos.nombre = req.body.nombre;
    if (req.body.descripcion !== undefined)
      datos.descripcion = req.body.descripcion;
    if (req.body.precio !== undefined) datos.precio = req.body.precio;
    if (req.body.categoriaId !== undefined)
      datos.categoriaId = req.body.categoriaId;
    if (req.body.stock !== undefined) datos.stock = req.body.stock;

    if (req.file) {
      datos.imagen = req.file.filename;
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, datos, {
      new: true,
      runValidators: true,
    });

    if (!productoActualizado) {
      // ← 404 si no existe
      return res
        .status(404)
        .json({ ok: false, mensaje: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    next(error);
  }
}

//Elimiar producto: DELETE /api/products/:id
async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      // ← 404 si no existe
      return res
        .status(404)
        .json({ ok: false, mensaje: "Producto no encontrado" });
    }

    res.json({
      ok: true,
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
