var express = require('express');
var router = express.Router();

/* GET /users */
router.get('/', function(req, res) {
  // Simulación de productos
  const productos = [
    { id: 1, nombre: 'Paracetamol 500mg', precio: 1200 },
    { id: 2, nombre: 'Ibuprofeno 400mg', precio: 1500 },
    { id: 3, nombre: 'Amoxicilina 500mg', precio: 1800 }
  ];

  res.render('user', {
    titulo: 'Bienvenido',
    productos: productos
  });
});

module.exports = router;
