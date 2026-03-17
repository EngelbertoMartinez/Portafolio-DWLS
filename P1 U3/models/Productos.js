const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  tamanio: {
    type: String
  },
  numeroParte: {
    type: String
  },
  proveedor: {
    type: String
  },
  imagenes: {
    type: [String]
  }
});

// Forzamos nombre de colección: productos
module.exports = mongoose.model('Producto', ProductoSchema, 'productos');