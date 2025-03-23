const mongoose = require("mongoose");

const programacionSchema = new mongoose.Schema({
    persiana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persianas',
        required: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    hora: {
        hour: { type: Number, required: true, min: 0, max: 23 },
        minute: { type: Number, required: true, min: 0, max: 59 }
    },
    isPM: {
        type: Boolean,
        default: false
    },
    dias: {
        lunes: { type: Boolean, default: false },
        martes: { type: Boolean, default: false },
        miercoles: { type: Boolean, default: false },
        jueves: { type: Boolean, default: false },
        viernes: { type: Boolean, default: false },
        sabado: { type: Boolean, default: false },
        domingo: { type: Boolean, default: false }
    },
    tipoHorario: {
        type: String,
        enum: ['una_vez', 'diario', 'dias_laborables', 'personalizado'],
        required: true
    },
    accion: {
        type: String,
        enum: ['abrir', 'cerrar', 'apertura_parcial'],
        required: true
    },
    nivelApertura: {
        type: Number,
        min: 0,
        max: 100,
        default: 100 // Solo usado cuando acción es 'apertura_parcial'
    },
    ubicacion: {
        type: String,
        required: true,
        trim: true
    },
    activa: {
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
    fechaModificacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Programaciones", programacionSchema);