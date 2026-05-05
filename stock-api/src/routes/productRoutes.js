const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middlewares/auth');

// GET
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// POST
router.post('/', auth, async (req, res) => {
  try {
    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
});

// PATCH
router.patch('/:id', auth, async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;