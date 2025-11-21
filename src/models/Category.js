// Modelo Category: representa una categoría de productos
const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la categoría es obligatorio"],
      trim: true,
      minlength: [2, "Mínimo 2 caracteres"],
      maxlength: [100, "Máximo 100 caracteres"],
      unique: true,
    },
  },
  { timestamps: true }
);

// Transformar _id -> id en las respuestas JSON
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = model("Category", categorySchema);
