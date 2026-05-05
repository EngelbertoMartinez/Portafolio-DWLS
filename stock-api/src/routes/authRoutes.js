const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de la autenticacion del usuario
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;