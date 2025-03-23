const mongoose = require("mongoose");

const persianaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['abierta', 'cerrada', 'parcial'],
        default: 'cerrada'
    },
    nivelApertura: {
        type: Number,
        min: 0,
        max: 100,
        default: 0 // 0% = cerrada, 100% = abierta
    },
    temperatura: {
        type: Number,
        default: 22.0
    },
    humedad: {
        type: Number,
        default: 50
    },
    conectada: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    ultimaActualizacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Persianas", persianaSchema);