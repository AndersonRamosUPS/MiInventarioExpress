const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Para que devuelva id en vez de _id
CategoriaSchema.method("toJSON", function () {
  const { _id, ...obj } = this.toObject();
  obj.id = _id;
  return obj;
});

module.exports = mongoose.model("Categoria", CategoriaSchema);
