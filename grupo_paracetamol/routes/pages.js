const express = require('express');
const router = express.Router();

/* ---------- PÁGINA PRINCIPAL ---------- */
router.get('/', (req, res) => {
  res.render('index');
});

/* ---------- ADMIN ---------- */
router.get('/admin/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login' });
});

router.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard', { title: 'Panel de Control' });
});

router.get('/admin/productos/nuevo', (req, res) => {
  res.render('admin/product_form', { title: 'Alta Producto' });
});

router.get('/admin/modificar', (req, res) => {
  res.render('admin/modificar', { title: 'Modificar Producto' });
});
/* ---------- CLIENTE ---------- */
router.get('/cliente', (req, res) => {
  res.render('client/welcome');
});

router.get('/cliente/productos', (req, res) => {
  res.render('client/products');
});

router.get('/cliente/carrito', (req, res) => {
  res.render('client/cart');
});

router.get('/cliente/ticket', (req, res) => {
  res.render('client/ticket');
});

/* ---------- GENERALES ---------- */
router.get('/productos', (req, res) => {
  res.render('listadoProductos');
});

router.get('/form-productos', (req, res) => {
  res.render('formProductos');
});

router.get('/user', (req, res) => {
  res.render('user');
});

/* ---------- ERROR 404 ---------- */
router.use((req, res) => {
  res.status(404).render('error', { message: 'Página no encontrada' });
});

module.exports = router;
