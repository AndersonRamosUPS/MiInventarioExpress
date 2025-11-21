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
    imagen: {
      type: String,
      default: "sin-imagen.png",
    },
    categoriaId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "El stock no puede ser negativo"],
    },
  },
  { timestamps: true }
);

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    // Mapear campos internos en español -> nombres en ingles para el frontend
    ret.id = ret._id;
    ret.name = ret.nombre;
    ret.description = ret.descripcion ?? "";
    ret.price = ret.precio;
    ret.imageUrl = ret.imagen;
    ret.stock = ret.stock ?? 0;
    ret.categoryId = ret.categoriaId ?? null;

    //  Quitar los nombres en español del JSON
    delete ret._id;
    delete ret.nombre;
    delete ret.descripcion;
    delete ret.precio;
    delete ret.imagen;
    delete ret.categoriaId;
  },
});

module.exports = model("Producto", productSchema);
