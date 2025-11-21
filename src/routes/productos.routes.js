const express = require("express");
const { param } = require("express-validator");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/producto.controller");

const router = express.Router();

// Validador simple de ID de Mongo
const validarId = [
  param("id")
    .isMongoId()
    .withMessage("El ID proporcionado no es válido"),
];

//  API REST JSON MercApp

// GET /api/products
router.get("/", listarProductos);

// GET /api/products/:id
router.get("/:id", validarId, obtenerProducto);

// POST /api/products
router.post("/", crearProducto);

// PUT /api/products/:id
router.put("/:id", validarId, actualizarProducto);

// PATCH /api/products/:id
router.patch("/:id", validarId, actualizarProducto);

// DELETE /api/products/:id
router.delete("/:id", validarId, eliminarProducto);

module.exports = router;
