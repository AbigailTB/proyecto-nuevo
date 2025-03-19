const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Esto hace que el campo sea único
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("usuarios", registerSchema);