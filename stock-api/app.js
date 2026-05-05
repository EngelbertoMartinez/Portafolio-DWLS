require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/stock-api')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/productos', require('./src/routes/productRoutes'));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});