const mongoose = require('mongoose');

// Esquema de usuario por email y password
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);