const express = require('express');
const router = express.Router();
const Contacto = require('../models/contacto');

// Enviar un mensaje de contacto
router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;
    
    const nuevoContacto = new Contacto({
      nombre,
      email,
      telefono,
      mensaje
    });
    
    await nuevoContacto.save();
    
    res.status(201).json({
      message: 'Mensaje enviado correctamente',
      contacto: nuevoContacto
    });
  } catch (error) {
    console.error('Error al enviar mensaje de contacto:', error);
    res.status(500).json({ message: 'Error al enviar mensaje', error: error.message });
  }
});

module.exports = router;