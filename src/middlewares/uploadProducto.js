const path = require("path");
const multer = require("multer");

//Carpeta destino -> src/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); //ext del archivo-> .png/ jpg/ etc
    const nombreLimpio = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const nombreFinal = `${Date.now()}-${nombreLimpio || "producto"}${ext}`;
    cb(null, nombreFinal);
  },
});

//Formatos permitidos
const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

function fileFilter(req, file, cb) {
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido. Solo JPG, PNG o WEBP."), false);
  }
}

// Controla errores y sigue el flujo
const uploadProducto = (req, res, next) => {
  upload.single("imagen")(req, res, function (err) {
    if (err) {
      // Tipo de archivo inválido
      if (err.message.includes("Tipo de archivo no permitido")) {
        req.session.multerError = err.message;
        return res.redirect("/productos/nuevo");
      }

      // Tamaño excedido
      if (err.code === "LIMIT_FILE_SIZE") {
        req.session.multerError =
          "El archivo es demasiado grande. Tamaño maximo: 2MB.";
        return res.redirect("/productos/nuevo");
      }

      return next(err);
    }

    next();
  });
};

module.exports = uploadProducto;
