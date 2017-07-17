/**
 * server REST api
 *
 * @author: Angel Céspedes Quiroz
 * @Skype: acq1305
 * @Linkedin: https://bo.linkedin.com/in/acq1305
 *
 */

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config/config');	//llamamos a nuestra configuración

//****************************************************************************************
// mis servicios API REST
//****************************************************************************************
var api = require('./servicios/api');												// API REST Genericos
var log = require('./servicios/log');		  									// API REST Log
var sellado = require('./servicios/sellado');		  					// API REST Sellado
var configuracion = require('./servicios/configuracion');  	// API REST Configuracion
var usuario = require('./servicios/usuario');		 				  	// API REST Usuario

//****************************************************************************************
// modulo de Authentication.
//****************************************************************************************
var auth = require('http-auth');
var basic = auth.basic({
	realm: "Node JS API",
  file: "./keys.htpasswd" // archivo que guarda la clave de acceso
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(config.auth == true) {
	app.use(auth.connect(basic));
}

app.all('/*', function(req, res, next) {
  // CORS de encabezados
  res.header("Access-Control-Allow-Origin", "*"); // acceso de cualquier origén
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // Estableciendo encabezados personalizados para CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  next();
});

//****************************************************************************************
// Añadiendo RUTAS a los servicios API REST
//****************************************************************************************
// mensaje de la url raiz
router.get('/', function(req, res) {
	res.json({ mensaje: 'API REST backend-sellador' });
});

router.get('/sellador', function(req, res) {
	res.json({ mensaje: 'API REST backend-sellador' });
});

// la url siempre empezara con sellador
app.use('/sellador/api', api);
app.use('/sellador/log', log);
app.use('/sellador/sellado', sellado);
app.use('/sellador/configuracion', configuracion);
app.use('/sellador/usuario', usuario);
app.use('/', router);
app.use('/sellador', router);

// mensaje si la url no es correcta
app.use(function(req, res, next) {
	res.status(404);
	res.send({
		"success" : 0,
		"message" : 'URL no Valido'
	});
});

//****************************************************************************************
// Iniciador del Servicio REST
var server = app.listen(config.port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(config.port);
	console.log('API REST Iniciado en http://%s:%s', host, port);
});
