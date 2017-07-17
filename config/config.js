/**
 * Variables Globales
 *
 * @author: Angel Céspedes Quiroz
 * @Skype: acq1305
 * @Linkedin: https://bo.linkedin.com/in/acq1305
 *
 */
// Declaramos la Variable Global
var config = {};

// Configuramos el puerto que usará nuestro servicio REST
config.port = 3000;

// Autentificación
config.auth = false;

// Base de datos MySQL
config.database = 'admtsa';
config.username = 'root';
config.password = 'acq1305';

// Paginación
config.paginate = true;
config.page_limit = 10;

// Exportamos la Variable
module.exports = config;
