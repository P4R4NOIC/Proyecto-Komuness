const mongoose = require('mongoose');

// Define el esquema del usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: String
});

// Crea el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
