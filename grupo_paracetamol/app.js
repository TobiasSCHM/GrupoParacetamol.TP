var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pagesRouter = require('./routes/pages');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api_routes');
const session = require('express-session');

//##############################################################################################//
//RUTAS PARA EL CRUD ARCHIVOS Y FOTOS
//##############################################################################################//
const rutas_fotos = require("./routes/routes_photos");

var app = express();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views/client'),
  path.join(__dirname, 'views/admin'), 
  path.join(__dirname, 'views/layouts'),
  path.join(__dirname, 'views/partials'),
  path.join(__dirname, 'views')
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// --- SESIONES (DEBE IR ANTES DE RUTAS) ---
app.use(session({
  secret: 'grupo_paracetamol_key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

app.use(express.static(path.join(__dirname, 'public')));
// para que encuentre bootsrap, me estaba dando errores sino
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// --- RUTAS ---
app.use('/', indexRouter);
app.use('/users/productosapi', usersRouter);
app.use('/api', apiRouter);
app.use('/', pagesRouter);
app.use("/productos_fotos", rutas_fotos);
// app.use('/photos', photoRouter); // (no existe pero tengo miedo de borrarlo)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;