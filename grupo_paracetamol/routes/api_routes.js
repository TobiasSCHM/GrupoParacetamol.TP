const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Venta = require('../models/venta');
const Usuario = require('../models/usuario');

const PATH_PRODUCTOS = path.join(__dirname, '..', 'archivos', 'productos.json');
const PATH_PRODUCTOS_FOTOS = path.join(__dirname, '..', 'archivos', 'productos_fotos.json');

function leerProductos() {
  const pathToUse = fs.existsSync(PATH_PRODUCTOS_FOTOS) ? PATH_PRODUCTOS_FOTOS : PATH_PRODUCTOS;
  if (!fs.existsSync(pathToUse)) return [];
  try { return JSON.parse(fs.readFileSync(pathToUse, 'utf8')); } catch { return []; }
}


router.get('/productos', (req, res) => {
  const productos = leerProductos();
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 8);
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({ page, limit, total: productos.length, items: productos.slice(start, end) });
});

router.get('/productos/:id', (req, res) => {
  const id = req.params.id;
  const productos = leerProductos();
  const prod = productos.find(p => String(p.id) === id || String(p.codigo) === id);
  if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(prod);
});

router.post('/ventas', express.json(), (req, res) => {
  const { cliente, fecha, total, items } = req.body;
  if (!cliente || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos de venta inválidos' });
  }
  const totalCalc = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const venta = Venta.guardar({ cliente, fecha: fecha || new Date().toISOString(), total: total || totalCalc, items });
  res.status(201).json({ ok: true, venta });
});

router.get('/ventas', (req, res) => {
  res.json(Venta.obtenerTodas());
});

router.post('/usuarios', express.json(), (req, res) => {
  const { email, nombre, password } = req.body;
  try {
    const nuevo = Usuario.crear({ email, nombre, password });
    res.status(201).json({ ok: true, usuario: nuevo });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// POST /api/productos - CREAR PRODUCTO
router.post('/productos', express.json(), (req, res) => {
  const { nombre, precio, categoria } = req.body;
  
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Marca y precio requeridos' });
  }

  const productos = leerProductos();
  const nuevoProducto = {
    codigo: Date.now(),
    marca: nombre,
    precio: parseFloat(precio),
    categoria: categoria || 'electronica',
    path: 'img/default.jpg'
  };

  productos.push(nuevoProducto);
  const pathToUse = fs.existsSync(PATH_PRODUCTOS_FOTOS) ? PATH_PRODUCTOS_FOTOS : PATH_PRODUCTOS;
  fs.writeFileSync(pathToUse, JSON.stringify(productos, null, 2));
  
  res.status(201).json({ success: true, producto: nuevoProducto });
});

// DELETE /api/productos/:id - ELIMINAR PRODUCTO
router.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  const productos = leerProductos();
  const productosFiltrados = productos.filter(p => String(p.codigo) !== id);
  
  if (productos.length === productosFiltrados.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const pathToUse = fs.existsSync(PATH_PRODUCTOS_FOTOS) ? PATH_PRODUCTOS_FOTOS : PATH_PRODUCTOS;
  fs.writeFileSync(pathToUse, JSON.stringify(productosFiltrados, null, 2));
  
  res.json({ success: true, message: 'Producto eliminado' });
});

// POST /api/admin/login - LOGIN ADMIN
router.post('/admin/login', express.json(), (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@admin' && password === '1234') {
    res.json({ success: true, token: 'admin-token' });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

module.exports = router;