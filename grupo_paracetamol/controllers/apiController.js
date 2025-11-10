const ProductoFoto = require('../models/producto_foto');

const apiController = {
  // OBTENER PRODUCTOS 
  getProductos: async (req, res) => {
    try {
      const productos = await ProductoFoto.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  // CREAR PRODUCTO
  createProducto: async (req, res) => {
    try {
      const { marca, precio, categoria } = req.body;
      
      const nuevoProducto = {
        codigo: Date.now(),
        marca: marca,
        precio: parseFloat(precio),
        categoria: categoria || 'electronica'
      };

      const resultado = await ProductoFoto.agregar(nuevoProducto, req.file);
      res.json({ success: true, producto: nuevoProducto });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear producto' });
    }
  }
};