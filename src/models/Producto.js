const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "Minimo 2 caracteres"],
      maxlength: [100, "Maximo 100 caracteres"],
      unique: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio debe ser >=0"],
    },
    descripcion: {
      type: String,
      trim: true,
      maxlength: [500, "Maximo 500 caracteres"],
      default: "",
    },
    imagen:{
        type: String,
        default: 'sin-imagen.png',
    }
  },
  { timestamps: true }
);

module.exports = model("Producto", productSchema);
