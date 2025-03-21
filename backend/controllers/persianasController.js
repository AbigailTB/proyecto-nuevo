const Persiana = require('../models/persianas');

exports.getPersianas = async (req, res) => {
    try {
        const persianas = await Persiana.find();
        res.json(persianas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPersiana = async (req, res) => {
    try {
        const persiana = new Persiana(req.body);
        const nuevaPersiana = await persiana.save();
        res.status(201).json(nuevaPersiana);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePersiana = async (req, res) => {
    try {
        const persiana = await Persiana.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!persiana) return res.status(404).json({ message: 'Persiana no encontrada' });
        res.json(persiana);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePersiana = async (req, res) => {
    try {
        const persiana = await Persiana.findByIdAndDelete(req.params.id);
        if (!persiana) return res.status(404).json({ message: 'Persiana no encontrada' });
        res.json({ message: 'Persiana eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};