const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productosRouter = require("./routes/productos.routes"); 
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Conexion a MongoDB
connectDB(process.env.MONGODB_URI);

// Middlewares globales
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/productos", productosRouter); 

// Pagina de prueba
app.get("/", (req, res) => res.send("Servidor funcionando correctamente!"));

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`[HTTP] Servidor escuchando en http://localhost:${PORT}`);
});
