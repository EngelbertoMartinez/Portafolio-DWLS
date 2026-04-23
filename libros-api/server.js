const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas
const libroRoutes = require('./routes/libroRoutes');
app.use('/', libroRoutes);

// Conexión
mongoose.connect('mongodb://127.0.0.1:27017/libros-api')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
