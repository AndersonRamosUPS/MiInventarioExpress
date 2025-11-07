const express = require("express");
const { body, param } = require("express-validator");
const {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/producto.controller");

const router = express.Router();

// Validaciones para crear producto
const validacionesCrear = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("precio").isFloat({ min: 0 }).withMessage("El precio debe ser mayor o igual a 0"),
];

// Validaciones para actualizar producto
const validacionesActualizar = [
  body("nombre").optional().isLength({ min: 2, max: 100 }),
  body("precio").optional().isFloat({ min: 0 }),
];

// Validacion del parámetro ID
const validarId = [
  param("id").isMongoId().withMessage("ID invalido"),
];

// CRUD
router.post("/", validacionesCrear, crearProducto);
router.get("/", listarProductos);
router.get("/:id", validarId, obtenerProducto);
router.put("/:id", [...validarId, ...validacionesActualizar], actualizarProducto);
router.delete("/:id", validarId, eliminarProducto);

module.exports = router;

