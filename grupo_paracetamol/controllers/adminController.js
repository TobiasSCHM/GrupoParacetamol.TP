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




// controllers/adminController.js
const fs = require('fs');
const path = require('path');
const USERS_PATH = path.join(__dirname, '../archivos/usuarios.json');

function loadUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
}

exports.login = (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const found = users.find(u => u.email === email && u.password === password);

  if (!found) {
    return res.render('admin/login', { title: 'Login Admin', error: 'Usuario o contraseña incorrectos' });
  }

  req.session.user = found;
  res.redirect('/admin/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

exports.ensureAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  next();
};
