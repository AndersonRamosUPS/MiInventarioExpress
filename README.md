#  MiInventarioExpress

Aplicación web de inventario con autenticación, gestión de productos y chat en tiempo real.  
Desarrollada con **Node.js**, **Express**, **MongoDB**, **Handlebars**, y **Socket.io**.

---

## Datos del estudiante

- **Nombre:** Anderson Vicente Ramos Iza  
- **Carrera:** Ingenieria en Software
- **Materia:** Aplicaciones Web  
- **Docente:** Ing. Jose Jaime  
- **Fecha:** 09/11/2025

---

## Tecnologías principales

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Express-Handlebars** (motor de vistas)
- **Express-Validator** (validaciones de formularios)
- **Express-Session** + **Connect-Mongo** (sesiones persistentes)
- **Multer** (subida de imágenes)
- **Socket.io** (chat en tiempo real)
- **CSS puro y responsive design**

---

## Funcionalidades implementadas

### Autenticación de usuarios
- Registro, inicio y cierre de sesión.
- Sesiones persistentes con MongoDB.
- Validaciones de campos (correo, contraseña, nombre).
- Mensajes de error y éxito dinámicos en las vistas.

### Gestión de productos (CRUD)
- Crear, listar, editar y eliminar productos.
- Subida de imágenes con **Multer**.
- Validación de entradas con **express-validator**.
- Interfaz limpia y responsive con **Handlebars**.
- Redirecciones según estado de sesión.

### Chat en tiempo real (Socket.io)
- Comunicación instantánea entre usuarios autenticados.
- Mensajes con nombre de usuario y hora.
- Avisos de ingreso y salida del chat.

### Interfaz responsive
- Adaptación automática a pantallas móviles, tablets y escritorio.
- Navbar dinámico con opciones según el estado del usuario.
- Cards de productos ordenadas y consistentes.

### Pruebas manuales
- Validación completa con **Postman**, **navegador** y **consola**.
- Confirmación de funcionamiento de rutas API y vistas.
- Manejo de errores controlado (404, validaciones, sesiones, etc).

---

## Instrucciones de instalación y uso

### 1️ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/MiInventarioExpress.git
cd MiInventarioExpress
```
### 2️ Instalar dependencias
```bash
npm install bcrypt connect-mongo cors dotenv express express-handlebars express-session express-validator mongoose morgan multer socket.io
```

### 3 Configurar el archivo .env
```bash
MONGODB_URI=mongodb://localhost:27017/inventario
SESSION_SECRET=mi_clave_segura
PORT=3000

```

### 4 Ejecutar la aplicación
```bash
npm run dev
```
Luego abrir en el navegador:

http://localhost:3000

---
### Rutas principales

| Ruta                    | Descripción                          |
| ----------------------- | ------------------------------------ |
| `/`                     | Redirección según sesión             |
| `/login`                | Página de inicio de sesión           |
| `/registro`             | Página de registro                   |
| `/productos`            | Listado de productos                 |
| `/productos/nuevo`      | Crear nuevo producto                 |
| `/productos/:id/editar` | Editar producto                      |
| `/chat`                 | Chat en tiempo real (requiere login) |
| `/api/auth/*`           | Endpoints de autenticación           |
| `/api/productos/*`      | Endpoints CRUD de productos          |

---
### Estructura del proyecto
```
MiInventarioExpress/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── producto.controller.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── uploadProducto.js
│   ├── models/
│   │   ├── Producto.js
│   │   └── Usuario.js
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css
│   │   └── js/
│   │       └── chat.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── productos.routes.js
│   │   └── vistas.routes.js
│   ├── uploads/
│   │   └── (imágenes subidas)
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.hbs
│   │   ├── partials/
│   │   │   └── navbar.hbs
│   │   ├── auth/
│   │   │   ├── login.hbs
│   │   │   └── registro.hbs
│   │   ├── productos/
│   │   │   ├── lista.hbs
│   │   │   ├── nuevo.hbs
│   │   │   └── editar.hbs
│   │   └── chat.hbs
│   └── index.js
│
├── .env
├── package.json
└── README.md
```

##  Créditos
Proyecto desarrollado por **Anderson Ramos Iza**