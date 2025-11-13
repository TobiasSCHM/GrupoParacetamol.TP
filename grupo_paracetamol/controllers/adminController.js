const ProductoFoto = require('../models/producto_foto');
const fs = require('fs');
const path = require('path');
const USERS_PATH = path.join(__dirname, '../archivos/usuarios.json');

function loadUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
}

const adminController = {
  // LOGIN - Maneja tanto API como vistas SIN CONFLICTOS
  login: async (req, res) => {
    const { email, password } = req.body;
    
    // Validación común
    const isValid = email === 'admin@admin' && password === '1234';
    
    if (isValid) {
      // DETECTAR TIPO DE PETICIÓN
      const isApiRequest = req.headers['content-type']?.includes('application/json');
      
      if (isApiRequest) {
        // RESPUESTA PARA API (Frontend JavaScript)
        return res.json({ 
          success: true, 
          token: 'admin-token',
          message: 'Login exitoso' 
        });
      } else {
        // RESPUESTA PARA VISTAS (Formularios HTML)
        req.session.user = { 
          email: email, 
          role: 'admin' 
        };
        return res.redirect('/admin/dashboard');
      }
    }
    
    // ERROR - Manejar según tipo de petición
    const isApiRequest = req.headers['content-type']?.includes('application/json');
    if (isApiRequest) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    } else {
      return res.render('admin/login', { 
        title: 'Login Admin', 
        error: 'Credenciales inválidas' 
      });
    }
  },

  // LOGOUT - Compatible con ambos sistemas
  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  },

  // MIDDLEWARE DE AUTORIZACIÓN
  ensureAdmin: (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.redirect('/login');
    }
  },

  // OBTENER TODOS LOS PRODUCTOS (SOLO API)
  getProductos: async (req, res) => {
    try {
      const productos = await ProductoFoto.obtenerTodos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  // CREAR PRODUCTO (SOLO API)
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
        res.redirect('/admin/dashboard');
      } else {
        res.status(500).json({ error: 'Error al crear producto' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
};

module.exports = adminController;