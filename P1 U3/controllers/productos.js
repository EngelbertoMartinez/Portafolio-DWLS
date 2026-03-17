const Producto = require('../models/Productos');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener producto por ID
exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener productos con filtros
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find(req.query);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};