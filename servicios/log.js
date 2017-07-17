/**
 * API REST Log
 *      pk
 * Log [id, fecha, descripcion]
 *
 * @author: Angel Céspedes Quiroz
 * @Skype: acq1305
 * @Linkedin: https://bo.linkedin.com/in/acq1305
 *
 */

var express = require('express');

module.exports = (function() {

  var router = express.Router();
  var Sequelize = require('sequelize');
  var config = require('../config/config');

  //Iniciando la base de datos
  var sequelize = new Sequelize(config.database, config.username, config.password);

  //Configurando la Paginación
  var paginate = config.paginate;
  var page_limit = config.page_limit;

  var mysql_clean = function(string) {
    return sequelize.getQueryInterface().escape(string);
  };

  //Leyendo datos de la tabla Log
  router.get('', function(req, res) {
    if (paginate) {
      var page = 1;
      if (req.query.page)
        page = req.query.page;
      var offset = (page - 1) * page_limit;

      //Calculando numero de paginas
      var next = Number(page) + 1;
      if (page != 1)
        var previous = Number(page) - 1;
      else
        var previous = Number(page);

      var read_query = "SELECT * FROM `" + ('log') + "` LIMIT " + page_limit + " OFFSET " + offset;
    } else {
      var read_query = "SELECT * FROM `" + ('log') + "`";
    }
    sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
      if (!rows.length) {
        res.status(404);
        res.json({"success": 0, "data": "No hay datos"});
      }
      res.status(200);
      if (!next)
        res.json({"success": 1, "data": rows});
      else
        var last = Math.ceil(rows.length / page_limit);
      res.json({
        "success": 1,
        "data": rows,
        "pages": {
          "next": next,
          "previous": previous,
          "last": last
        }
      });
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Insertando datos en la tabla Log
  router.post('', function(req, res) {
    if (JSON.stringify(req.body) == '{}') {
      res.status(404);
      res.json({"success": 0, "message": "Parametros ausentes"});
      return false;
    }
    var keys = '';
    var values = '';
    Object.keys(req.body).forEach(function(key, index) {
      var val = req.body[key];
      keys += "`" + key + "`";
      values += mysql_clean(val);
      if (Object.keys(req.body).length != (index + 1)) {
        keys += ',';
        values += ',';
      }
    });
    sequelize.query("INSERT INTO `" + ('log') + "` (" + keys + ") VALUES (" + values + ")", {type: sequelize.QueryTypes.INSERT}).then(function(id) {
      res.status(201);
      res.json({"success": 1, "id": id});
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  return router;

})();
