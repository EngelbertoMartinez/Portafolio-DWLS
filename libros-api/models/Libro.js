const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicacion: { type: Number, required: true },
  precio: { type: Number, required: true }
});

module.exports = mongoose.model('Libro', libroSchema);
