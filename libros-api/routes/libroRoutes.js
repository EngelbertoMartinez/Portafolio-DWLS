const express = require('express');
const router = express.Router();
const controller = require('../controllers/LibroController');

router.post('/Libros', controller.crearLibro);
router.get('/Libros/:id', controller.obtenerLibro);
router.get('/Listado', controller.listarLibros);
router.put('/modifica/:id', controller.actualizarLibro);
router.delete('/elimina/:id', controller.eliminarLibro);

module.exports = router;
