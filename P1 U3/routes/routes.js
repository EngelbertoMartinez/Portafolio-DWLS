const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');

// CRUD

// Crear producto
router.post('/producto', productosController.crearProducto);

// Obtener por ID
router.get('/producto/:id', productosController.obtenerProducto);

// Obtener con filtros
router.get('/productos', productosController.obtenerProductos);

// Actualizar producto
router.put('/producto/:id', productosController.actualizarProducto);

// Eliminar producto
router.delete('/producto/:id', productosController.eliminarProducto);

module.exports = router;