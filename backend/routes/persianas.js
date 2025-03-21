const express = require('express');
const router = express.Router();
const Persiana = require('../models/persianas');
const auth = require('../middleware/auth');

// Obtener todas las persianas del usuario
router.get('/', auth, async (req, res) => {
  try {
    const persianas = await Persiana.find({ usuario: req.user.id });
    res.json(persianas);
  } catch (error) {
    console.error('Error al obtener persianas:', error);
    res.status(500).json({ message: 'Error al obtener persianas', error: error.message });
  }
});

// Obtener una persiana específica
router.get('/:id', auth, async (req, res) => {
  try {
    const persiana = await Persiana.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    res.json(persiana);
  } catch (error) {
    console.error('Error al obtener persiana:', error);
    res.status(500).json({ message: 'Error al obtener persiana', error: error.message });
  }
});

// Crear una nueva persiana
router.post('/', auth, async (req, res) => {
  try {
    const { nombre, ubicacion, macAddress } = req.body;
    
    const nuevaPersiana = new Persiana({
      nombre,
      ubicacion,
      macAddress: macAddress || `mac-${Date.now()}`, // Generar MAC ficticia si no se proporciona
      usuario: req.user.id
    });
    
    await nuevaPersiana.save();
    
    res.status(201).json({
      message: 'Persiana creada correctamente',
      persiana: nuevaPersiana
    });
  } catch (error) {
    console.error('Error al crear persiana:', error);
    res.status(500).json({ message: 'Error al crear persiana', error: error.message });
  }
});

// Actualizar una persiana
router.put('/:id', auth, async (req, res) => {
  try {
    const persiana = await Persiana.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    // Campos actualizables
    const { nombre, ubicacion, estado, nivelApertura } = req.body;
    
    // Actualizar campos
    if (nombre) persiana.nombre = nombre;
    if (ubicacion) persiana.ubicacion = ubicacion;
    if (estado) persiana.estado = estado;
    if (nivelApertura !== undefined) persiana.nivelApertura = nivelApertura;
    
    persiana.ultimaActualizacion = Date.now();
    
    await persiana.save();
    
    res.json({
      message: 'Persiana actualizada correctamente',
      persiana
    });
  } catch (error) {
    console.error('Error al actualizar persiana:', error);
    res.status(500).json({ message: 'Error al actualizar persiana', error: error.message });
  }
});

// Eliminar una persiana
router.delete('/:id', auth, async (req, res) => {
  try {
    const persiana = await Persiana.findOneAndDelete({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    res.json({ message: 'Persiana eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar persiana:', error);
    res.status(500).json({ message: 'Error al eliminar persiana', error: error.message });
  }
});

// Actualizar el estado de una persiana
router.put('/:id/estado', auth, async (req, res) => {
  try {
    const { estado, nivelApertura } = req.body;
    
    const persiana = await Persiana.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    persiana.estado = estado;
    if (nivelApertura !== undefined) {
      persiana.nivelApertura = nivelApertura;
    } else if (estado === 'abierta') {
      persiana.nivelApertura = 100;
    } else if (estado === 'cerrada') {
      persiana.nivelApertura = 0;
    }
    
    persiana.ultimaActualizacion = Date.now();
    
    await persiana.save();
    
    res.json({
      message: 'Estado de persiana actualizado correctamente',
      persiana
    });
  } catch (error) {
    console.error('Error al actualizar estado de persiana:', error);
    res.status(500).json({ message: 'Error al actualizar estado', error: error.message });
  }
});

module.exports = router;