const ProductoFoto = require('../models/producto_foto');

const adminController = {
  // LOGIN ADMIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validación simple (luego mejorar)
      if (email === 'admin@admin' && password === '1234') {
        res.json({ 
          success: true, 
          token: 'admin-token-temporal',
          message: 'Login exitoso' 
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: 'Credenciales inválidas' 
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  },

  // OBTENER TODOS LOS PRODUCTOS
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
      const { marca, precio, categoria, activo } = req.body;
      
      const nuevoProducto = {
        codigo: Date.now(),
        marca: marca,
        precio: parseFloat(precio),
        categoria: categoria || 'electronica',
        activo: activo === 'true'
      };

      const resultado = await ProductoFoto.agregar(nuevoProducto, req.file);
      
      if (resultado) {
        res.json({ success: true, message: 'Producto creado' });
      } else {
        res.status(500).json({ error: 'Error al crear producto' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
};

module.exports = adminController;