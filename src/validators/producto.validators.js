const { body } = require("express-validator");

// Para crear producto
const validarCrearProducto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser mayor o igual a 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un entero mayor o igual a 0"),

  body("categoriaId")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("El id de categoría no es válido"),

  body("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripcion no puede superar los 500 caracteres"),
];

// Para actualizar producto
const validarActualizarProducto = [
  body("nombre")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),

  body("precio")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser mayor o igual a 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un entero mayor o igual a 0"),

  body("categoriaId")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("El id de categoría no es válido"),

  body("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripcion no puede superar los 500 caracteres"),
];

module.exports = {
  validarCrearProducto,
  validarActualizarProducto,
};
