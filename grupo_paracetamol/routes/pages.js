// routes/pages.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const adminController = require('../controllers/adminController');

// Página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Grupo Paracetamol', user: req.session.user });
});

// Login del admin
router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Login Admin', error: null });
});

// Procesar login
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

// Acceso rápido
router.get('/admin/quick', (req, res) => {
  req.session.user = { email: 'admin@tp.com', role: 'admin' };
  res.redirect('/admin/dashboard');
});

// Dashboard del admin (protegido)
router.get('/admin/dashboard', adminController.ensureAdmin, (req, res) => {
  res.render('admin/dashboard', { title: 'Panel Administrador', user: req.session.user });
});

// Formulario de productos (protegido)
router.get('/admin/product_form', adminController.ensureAdmin, (req, res) => {
  res.render('admin/product_form', { title: 'Gestión de Productos', user: req.session.user });
});

// Cliente - listado de productos
router.get('/client/products', (req, res) => {
  res.render('client/products', { title: 'Productos', user: req.session.user });
});

// Cliente - carrito
router.get('/client/cart', (req, res) => {
  res.render('client/cart', { title: 'Carrito', user: req.session.user });
});

module.exports = router;
