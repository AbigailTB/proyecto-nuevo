const express = require('express');
const router = express.Router();
const Programacion = require('../models/programaciones');
const Persiana = require('../models/persianas');
const auth = require('../middleware/auth');

// Obtener todas las programaciones del usuario
router.get('/', auth, async (req, res) => {
  try {
    const programaciones = await Programacion.find({ usuario: req.user.id })
      .populate('persiana', 'nombre ubicacion')
      .sort({ fechaCreacion: -1 });
    
    res.json(programaciones);
  } catch (error) {
    console.error('Error al obtener programaciones:', error);
    res.status(500).json({ message: 'Error al obtener programaciones', error: error.message });
  }
});

// Obtener programaciones por persiana
router.get('/persiana/:persianaId', auth, async (req, res) => {
  try {
    // Verificar que la persiana pertenece al usuario
    const persiana = await Persiana.findOne({ 
      _id: req.params.persianaId,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    const programaciones = await Programacion.find({ 
      persiana: req.params.persianaId,
      usuario: req.user.id
    }).sort({ fechaCreacion: -1 });
    
    res.json(programaciones);
  } catch (error) {
    console.error('Error al obtener programaciones:', error);
    res.status(500).json({ message: 'Error al obtener programaciones', error: error.message });
  }
});

// Obtener una programación específica
router.get('/:id', auth, async (req, res) => {
  try {
    const programacion = await Programacion.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    }).populate('persiana', 'nombre ubicacion');
    
    if (!programacion) {
      return res.status(404).json({ message: 'Programación no encontrada' });
    }
    
    res.json(programacion);
  } catch (error) {
    console.error('Error al obtener programación:', error);
    res.status(500).json({ message: 'Error al obtener programación', error: error.message });
  }
});

// Crear una nueva programación
router.post('/', auth, async (req, res) => {
  try {
    const { 
      persiana: persianaId, 
      nombre, 
      hora, 
      isPM, 
      dias, 
      tipoHorario, 
      accion, 
      nivelApertura,
      ubicacion,
      activa 
    } = req.body;
    
    // Verificar que la persiana pertenece al usuario
    const persiana = await Persiana.findOne({ 
      _id: persianaId,
      usuario: req.user.id
    });
    
    if (!persiana) {
      return res.status(404).json({ message: 'Persiana no encontrada' });
    }
    
    const nuevaProgramacion = new Programacion({
      persiana: persianaId,
      nombre,
      hora,
      isPM,
      dias,
      tipoHorario,
      accion,
      nivelApertura,
      ubicacion: ubicacion || persiana.ubicacion,
      activa: activa !== undefined ? activa : true,
      usuario: req.user.id
    });
    
    await nuevaProgramacion.save();
    
    res.status(201).json({
      message: 'Programación creada correctamente',
      programacion: nuevaProgramacion
    });
  } catch (error) {
    console.error('Error al crear programación:', error);
    res.status(500).json({ message: 'Error al crear programación', error: error.message });
  }
});

// Actualizar una programación
router.put('/:id', auth, async (req, res) => {
  try {
    const programacion = await Programacion.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!programacion) {
      return res.status(404).json({ message: 'Programación no encontrada' });
    }
    
    // Campos actualizables
    const { 
      nombre, 
      hora, 
      isPM, 
      dias, 
      tipoHorario, 
      accion, 
      nivelApertura,
      ubicacion,
      activa 
    } = req.body;
    
    // Actualizar campos
    if (nombre) programacion.nombre = nombre;
    if (hora) programacion.hora = hora;
    if (isPM !== undefined) programacion.isPM = isPM;
    if (dias) programacion.dias = dias;
    if (tipoHorario) programacion.tipoHorario = tipoHorario;
    if (accion) programacion.accion = accion;
    if (nivelApertura !== undefined) programacion.nivelApertura = nivelApertura;
    if (ubicacion) programacion.ubicacion = ubicacion;
    if (activa !== undefined) programacion.activa = activa;
    
    programacion.fechaModificacion = Date.now();
    
    await programacion.save();
    
    res.json({
      message: 'Programación actualizada correctamente',
      programacion
    });
  } catch (error) {
    console.error('Error al actualizar programación:', error);
    res.status(500).json({ message: 'Error al actualizar programación', error: error.message });
  }
});

// Eliminar una programación
router.delete('/:id', auth, async (req, res) => {
  try {
    const programacion = await Programacion.findOneAndDelete({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!programacion) {
      return res.status(404).json({ message: 'Programación no encontrada' });
    }
    
    res.json({ message: 'Programación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar programación:', error);
    res.status(500).json({ message: 'Error al eliminar programación', error: error.message });
  }
});

// Activar/desactivar programación
router.put('/:id/toggle', auth, async (req, res) => {
  try {
    const programacion = await Programacion.findOne({ 
      _id: req.params.id,
      usuario: req.user.id
    });
    
    if (!programacion) {
      return res.status(404).json({ message: 'Programación no encontrada' });
    }
    
    // Cambiar estado activo
    programacion.activa = !programacion.activa;
    programacion.fechaModificacion = Date.now();
    
    await programacion.save();
    
    res.json({
      message: `Programación ${programacion.activa ? 'activada' : 'desactivada'} correctamente`,
      programacion
    });
  } catch (error) {
    console.error('Error al cambiar estado de programación:', error);
    res.status(500).json({ message: 'Error al cambiar estado', error: error.message });
  }
});

module.exports = router;