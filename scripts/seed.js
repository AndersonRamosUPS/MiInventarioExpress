require("dotenv").config();
const mongoose = require("mongoose");
const Producto = require("../src/models/Producto");
const Categoria = require("../src/models/Categorias");

const MONGO_URL = process.env.MONGODB_URI;

async function correrSeed() {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(MONGO_URL);
    console.log("Conectado correctamente.");

    //Limpiar colecciones
    await Producto.deleteMany({});
    await Categoria.deleteMany({});
    console.log("Colecciones limpiadas.");

    //Crear categorías
    const categorias = await Categoria.insertMany([
      { nombre: "Bebidas" },
      { nombre: "Snacks" },
      { nombre: "Limpieza" },
      { nombre: "Tecnología" },
      { nombre: "Hogar" },
    ]);

    console.log("Categorías creadas:", categorias.length);

    //Crear productos
    const productos = [
      {
        nombre: "Coca Cola 1L",
        descripcion: "Bebida gaseosa clásica.",
        precio: 1.50,
        stock: 20,
        categoriaId: categorias[0]._id,
      },
      {
        nombre: "Pepsi 1L",
        descripcion: "Bebida gaseosa refrescante.",
        precio: 1.40,
        stock: 18,
        categoriaId: categorias[0]._id,
      },
      {
        nombre: "Doritos Queso",
        descripcion: "Snack de tortilla sabor queso.",
        precio: 2.00,
        stock: 30,
        categoriaId: categorias[1]._id,
      },
      {
        nombre: "Papas Lays",
        descripcion: "Papas fritas clasicas.",
        precio: 1.80,
        stock: 25,
        categoriaId: categorias[1]._id,
      },
      {
        nombre: "Detergente ACE",
        descripcion: "Detergente para ropa 1kg.",
        precio: 3.50,
        stock: 15,
        categoriaId: categorias[2]._id,
      },
      {
        nombre: "Lavavajillas Axion",
        descripcion: "Crema lavaplatos anti-graza.",
        precio: 1.70,
        stock: 22,
        categoriaId: categorias[2]._id,
      },
      {
        nombre: "Mouse Logitech",
        descripcion: "Mouse inalambrico.",
        precio: 12.00,
        stock: 10,
        categoriaId: categorias[3]._id,
      },
      {
        nombre: "Teclado Genius",
        descripcion: "Teclado de oficina.",
        precio: 8.50,
        stock: 14,
        categoriaId: categorias[3]._id,
      },
      {
        nombre: "Funda para almohada",
        descripcion: "Tela suave microfibra.",
        precio: 4.00,
        stock: 20,
        categoriaId: categorias[4]._id,
      },
    ];

    const productosInsertados = await Producto.insertMany(productos);

    console.log(`Se insertaron ${productosInsertados.length} productos.`);

    console.log("Seed completado con éxito.");
  } catch (error) {
    console.error("Error en el seed:", error);
  } finally {
    mongoose.connection.close();
    console.log("Conexión cerrada.");
  }
}

correrSeed();
