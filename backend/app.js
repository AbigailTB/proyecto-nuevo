require("dotenv").config(); // Cargar variables de entorno
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Servidor de archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
const registerRoutes = require("./routes/usuarioRuta");
app.use("/usuario", registerRoutes);

// Conectar a MongoDB Atlas
console.log("🔍 URI de conexión:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(error => console.error("❌ Error conectando a MongoDB:", error));

// Ruta básica para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 La app está corriendo en http://localhost:${port}`);
});