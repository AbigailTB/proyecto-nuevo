const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const config = require('../config/config');

exports.register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        let usuario = await Usuario.findOne({ email });
        if (usuario) return res.status(400).json({ message: 'El usuario ya existe' });

        usuario = new Usuario({ nombre, email, password });
        await usuario.save();

        const token = jwt.sign({ id: usuario._id, role: usuario.role }, config.jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ message: 'Credenciales inválidas' });

        const isMatch = await usuario.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: usuario._id, role: usuario.role }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};