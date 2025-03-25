const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Permitir solicitudes desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Permitir 'Authorization'
    credentials: true // Permitir envío de cookies y tokens en la petición
}));

// Servir archivos estáticos
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(express.json()); // Necesario para procesar JSON en `req.body`
app.use(express.urlencoded({ extended: true })); // Para datos de formularios

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Importar rutas
const verificarSesionRuta = require('./routes/verify-session');
const loginRuta = require('./routes/loginRuta');
const usuarioRuta = require('./routes/usuarioRuta');
const productosRutas = require('./routes/productosRutas');
const serviciosRuta = require('./routes/serviciosRuta');
const contactoRuta = require('./routes/contactoRuta');
const adminRuta = require('./routes/adminRuta');
const pedidosRuta = require('./routes/pedidosRuta');
const carritoRuta = require('./routes/carritoRuta');
const politicasRuta = require('./routes/politicasRuta');
const testimoniosRutas = require('./routes/testimoniosRutas');

// Middleware para manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error en el servidor'
    });
});

// Usar rutas
app.use('/verify-session', verificarSesionRuta);
app.use('/login', loginRuta);
app.use('/usuarios', usuarioRuta);
app.use('/productos', productosRutas);
app.use('/servicios', serviciosRuta);
app.use('/contacto', contactoRuta);
app.use('/admin', adminRuta);
app.use('/pedidos', pedidosRuta);
app.use('/carrito', carritoRuta);
app.use('/politicas', politicasRuta);
app.use('/testimonios', testimoniosRutas);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Crear estructura de carpetas para uploads si no existe
const fs = require('fs');
const path = require('path');

const directorios = [
    './uploads',
    './uploads/productos',
    './uploads/servicios'
];

directorios.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directorio creado: ${dir}`);
    }
});

module.exports = app;