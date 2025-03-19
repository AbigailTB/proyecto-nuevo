const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');
//
// GET /usuarios
// Obtiene todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios' });
            }
            });

// Ruta POST para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { email, password, name, surname, phone, role, status } = req.body;

    // Validación básica de campos requeridos
    if (!email || !password || !name || !surname || !phone || !role || !status) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Crear y guardar el nuevo usuario
        const nuevoUsuario = new Usuario({
            email,
            password,
            name,
            surname,
            phone,
            role,
            status
        });

        const savedUsuario = await nuevoUsuario.save();
        res.status(201).json(savedUsuario);
    } catch (error) {
        // Manejo de errores específicos
        if (error.code === 11000) { // Código de error de duplicado en MongoDB
            res.status(400).json({ message: "El correo electrónico ya está registrado" });
        } else {
            res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
        }
    }
});

module.exports = router;