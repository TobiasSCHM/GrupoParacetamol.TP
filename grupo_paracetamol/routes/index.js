var express = require('express');
var router = express.Router();

/* GET página principal (login) */
router.get('/', function(req, res) {
  res.render('index');
});

/* POST login */
router.post('/login', function(req, res) {
  const { email, password } = req.body;

  // Validación simple (por ahora sin base de datos)
  if (email === 'admin@farmacia.com' && password === '1234') {
    // ✅ Si está bien, redirige al panel del usuario
    res.redirect('/users');
  } else {
    // ❌ Si está mal, vuelve al login con error
    res.render('index', { error: 'Usuario o contraseña incorrectos' });
  }
});

module.exports = router;
