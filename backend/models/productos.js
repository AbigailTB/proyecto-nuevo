<<<<<<< HEAD
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    warranty: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    specs: {
        material: String,
        conectividad: String,
        bateria: String, // Sin tilde para coincidir con la colección
        motorizacion: String, // Sin tilde para coincidir con la colección
        resistencia: String,
    }
});

module.exports = mongoose.model("Productos", productoSchema);
=======
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Producto', productoSchema);
>>>>>>> c98c00c59ba8a55931c6b7b3c400f2619be96e49
