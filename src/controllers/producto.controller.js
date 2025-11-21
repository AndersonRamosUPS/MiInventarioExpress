const { validationResult } = require("express-validator");
const Producto = require("../models/Producto");

function manejarValidacion(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Los datos enviados no son válidos");
    error.status = 400;
    error.details = errors.array();
    throw error;
  }
}

function normalizarBodyProducto(req) {
  const body = req.body || {};

  if (body.name && !body.nombre) body.nombre = body.name;
  if (body.description && !body.descripcion)
    body.descripcion = body.description;
  if (body.price && !body.precio) body.precio = body.price;
  if (body.imageUrl && !body.imagen) body.imagen = body.imageUrl;
  if (body.categoryId && !body.categoriaId) body.categoriaId = body.categoryId;

  if (body.stock !== undefined && body.stock !== null && body.stock !== "") {
    body.stock = Number(body.stock);
  }

  req.body = body;
}

//Crear producto: POST /api/products
async function crearProducto(req, res, next) {
  try {
    normalizarBodyProducto(req);

    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoriaId: req.body.categoriaId || null,
      stock: req.body.stock ?? 0,
    };

    // Si viene archivo de imagen (desde formulario HTML)
    if (req.file) {
      data.imagen = req.file.filename;
    }

    const nuevoProducto = new Producto(data);
    const productoGuardado = await nuevoProducto.save();

    //toJSON del modelo, se devuelven campos en ingles
    res.status(201).json(productoGuardado);
  } catch (err) {
    next(err);
  }
}

//Listar productos: GET /api/products
async function listarProductos(req, res, next) {
  try {
    const productos = await Producto.find();
    res.json(productos); // aplica toJSON → nombres en inglés
  } catch (err) {
    next(err);
  }
}

//Obtener un producto por ID: GET /api/products/:id
async function obtenerProducto(req, res, next) {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto) {
      return res
        .status(404)
        .json({ ok: false, message: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (err) {
    next(err);
  }
}

//Actualizar: PUT /api/products/:id
async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params;

    normalizarBodyProducto(req);

    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoriaId: req.body.categoriaId || null,
      stock: req.body.stock,
    };

    if (req.file) {
      data.imagen = req.file.filename;
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!productoActualizado) {
      return res
        .status(404)
        .json({ ok: false, message: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (err) {
    next(err);
  }
}

//Elimiar producto: DELETE /api/products/:id
async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params;
    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res
        .status(404)
        .json({ ok: false, message: "Producto no encontrado" });
    }

    res.json({ ok: true, message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
