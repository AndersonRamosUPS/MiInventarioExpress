// Controlador de categorías: Solo lectura (GET /api/categories)
const Category = require("../models/Category");

// GET /api/categories
async function obtenerCategorias(req, res, next) {
  try {
    const categories = await Category.find().lean();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerCategorias,
};
