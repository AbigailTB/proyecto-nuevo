const Programacion = require('../models/programacion');

exports.getProgramaciones = async (req, res) => {
    try {
        const programaciones = await Programacion.find().populate('usuarioId');
        res.json(programaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProgramacion = async (req, res) => {
    try {
        const programacion = new Programacion(req.body);
        const nuevaProgramacion = await programacion.save();
        res.status(201).json(nuevaProgramacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProgramacion = async (req, res) => {
    try {
        const programacion = await Programacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!programacion) return res.status(404).json({ message: 'Programación no encontrada' });
        res.json(programacion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProgramacion = async (req, res) => {
    try {
        const programacion = await Programacion.findByIdAndDelete(req.params.id);
        if (!programacion) return res.status(404).json({ message: 'Programación no encontrada' });
        res.json({ message: 'Programación eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};