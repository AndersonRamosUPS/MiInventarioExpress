const express = require("express");
const { param, validationResult } = require("express-validator");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/producto.controller");
const {
  validarCrearProducto,
  validarActualizarProducto,
} = require("../validators/producto.validators");

const router = express.Router();

// Validador simple de ID de Mongo (para :id)
const validarId = [
  param("id")
    .isMongoId()
    .withMessage("El id proporcionado no es un ObjectId válido"),

  (req, res, next) => {
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      const error = new Error("Parámetros de ruta no válidos");
      error.status = 400;
      error.details = errores.array();
      return next(error);
    }

    next();
  },
];

// GET /api/products
router.get("/", listarProductos);

// GET /api/products/:id
router.get("/:id", validarId, obtenerProducto);

// POST /api/products
router.post("/", validarCrearProducto, crearProducto);

// PUT /api/products/:id
router.put(
  "/:id",
  [...validarId, ...validarActualizarProducto],
  actualizarProducto
);

// PATCH /api/products/:id
router.patch(
  "/:id",
  [...validarId, ...validarActualizarProducto],
  actualizarProducto
);

// DELETE /api/products/:id
router.delete("/:id", validarId, eliminarProducto);

module.exports = router;
