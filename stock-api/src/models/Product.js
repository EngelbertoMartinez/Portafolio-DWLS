const mongoose = require('mongoose');

// MODELADO DEL PRODUCTO
const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  umbralMinimo: {
    type: Number,
    required: true
  },
  estadoAlerta: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);