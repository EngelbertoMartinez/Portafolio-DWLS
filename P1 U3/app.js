const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const rutas = require('./routes/routes');

class App {
  constructor() {
    this.app = express();
    this.config();
    this.conectarDB();
    this.rutas();
  }

  config() {
    this.app.use(express.json());
  }

  conectarDB() {
    mongoose.connect(config.uri)
      .then(() => console.log("Conectado a MongoDB (ProductosActividad)"))
      .catch(err => console.error(err));
  }

  rutas() {
    this.app.use('/api', rutas);
  }

  start() {
    this.app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
    });
  }
}

const app = new App();
app.start();