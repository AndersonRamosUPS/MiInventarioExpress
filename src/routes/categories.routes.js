// Rutas del API REST para categorías
const express = require("express");
const { obtenerCategorias } = require("../controllers/category.controller");

const router = express.Router();

// GET /api/categories
router.get("/", obtenerCategorias);

module.exports = router;
