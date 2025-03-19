require("dotenv").config(); // Cargar variables de entorno
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

//servidor de archivos estáticos desde la caperta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a MongoDB Atlas
console.log("🔍 URI de conexión:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(error => console.error("❌ Error conectando a MongoDB:", error));

// Ruta básica para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Rutas

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 La app está corriendo en http://localhost:${port}`);
});