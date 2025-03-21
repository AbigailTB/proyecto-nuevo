const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
const auth = require('../middleware/auth');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, surname, phone } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    // Crear nuevo usuario
    const newUser = new Usuario({
      email,
      password, // Se encriptará automáticamente por el método pre en el modelo
      name,
      surname,
      phone,
      role: 'user'
    });
    
    await newUser.save();
    
    // No enviar la contraseña en la respuesta
    const userResponse = { ...newUser.toObject() };
    delete userResponse.password;
    
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: userResponse
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'tu_clave_secreta',
      { expiresIn: '24h' }
    );
    
    // No enviar la contraseña en la respuesta
    const userResponse = { ...user.toObject() };
    delete userResponse.password;
    
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

// Obtener usuario autenticado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await Usuario.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
});

module.exports = router;