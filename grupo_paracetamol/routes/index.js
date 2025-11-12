var express = require('express');
var router = express.Router();

// ✅ Página de inicio
router.get('/', function(req, res) {
  res.render('index', { title: 'Inicio | Grupo Paracetamol' });
});

// ✅ Página de productos del cliente
router.get('/client/products', function(req, res) {
  res.render('client/products', { title: 'Productos | Grupo Paracetamol' });
});

// ✅ Carrito
router.get('/client/cart', function(req, res) {
  res.render('client/cart', { title: 'Carrito | Grupo Paracetamol' });
});

// ✅ Ticket después de la compra
router.get('/client/ticket', function(req, res) {
  res.render('client/ticket', { title: 'Ticket | Grupo Paracetamol' });
});

// ✅ Login administrador
router.get('/admin/login', function(req, res) {
  res.render('admin/login', { title: 'Login | Admin Grupo Paracetamol' });
});

// ✅ Panel administrador
router.get('/admin/dashboard', function(req, res) {
  res.render('admin/dashboard', { title: 'Dashboard | Admin' });
});

// ✅ Formulario de producto (alta/edición)
router.get('/admin/product_form', function(req, res) {
  res.render('admin/product_form', { title: 'Formulario de Producto' });
});

module.exports = router;
