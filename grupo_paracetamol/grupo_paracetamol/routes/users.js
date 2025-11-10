var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const usuarios = ["juan", "esteban", "laura", "pedro"];

  res.render("user", {mis_usuarios : usuarios, titulo : "Mis usuarios" } );
});

module.exports = router;
