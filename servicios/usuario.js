/**
 * API REST Usuario
 *          pk                                fk
 * Usuario [id, usuario, contraseña, estado, codEC]
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

  //Leyendo datos de la tabla Usuario
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

      var read_query = "SELECT * FROM `" + ('usuario') + "` LIMIT " + page_limit + " OFFSET " + offset;
    } else {
      var read_query = "SELECT * FROM `" + ('usuario') + "`";
    }
    sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
      if (!rows.length) {
        res.status(404);
        res.json({"success": 0, "data": "No hay datos en la tabla"});
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

  //Leyendo un dato de la tabla Usuario
  router.get('/:usuario/:contrasenia', function(req, res) {
    sequelize.query("SELECT id, codEC FROM " + 'usuario  WHERE usuario = ' + mysql_clean(req.params.usuario) + ' and contrasenia = ' + mysql_clean(req.params.contrasenia) + ' and estado = 1', {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
    //sequelize.query("SELECT * FROM `" + TABLE_PREFIX + 'usuario' + "` WHERE `" + primary_key + "` = " + mysql_clean(req.params.id), {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
      if (!rows.length) {
        res.status(200);
        res.json({"success": 0, "data": "Datos Introducidos no Coinciden con un usuario registrado o activo..."});
      }
      res.status(200);
      res.json({"success": 1, "data": rows});
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Insertando datos en la tabla Usuario
  router.post('', function(req, res) {
    if (JSON.stringify(req.body) == '{}') {
      res.status(404);
      res.json({"success": 0, "message": "Faltan Parametros"});
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
    sequelize.query("INSERT INTO `" + ('usuario') + "` (" + keys + ") VALUES (" + values + ")", {type: sequelize.QueryTypes.INSERT}).then(function(id) {
      res.status(201);
      res.json({"success": 1, "id": id});
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Actualizando datos en la tabla Usuario
  router.put('/:id', function(req, res) {
    sequelize.query("SHOW KEYS FROM `" + ('usuario') + "` WHERE Key_name = 'PRIMARY'", {type: sequelize.QueryTypes.SELECT}).then(function(keys) {
      var primary_key = keys[0].Column_name;
      if (JSON.stringify(req.body) == '{}') {
        res.status(200);
        res.json({"success": 0, "message": "Faltan Parametros"});
        return false;
      }
      var update_string = '';
      Object.keys(req.body).forEach(function(key, index) {
        var val = req.body[key];
        update_string += "`" + key + "` = " + mysql_clean(val);
        if (Object.keys(req.body).length != (index + 1)) {
          update_string += ',';
        }
      });
      sequelize.query("UPDATE `" + ('usuario') + "` SET " + update_string + " WHERE `" + primary_key + "` = " + mysql_clean(req.params.id), {type: sequelize.QueryTypes.UPDATE}).then(function() {
        res.status(200);
        res.json({"success": 1, "message": "Actualizado..."});
      }).catch(function(err) {
        res.status(404);
        res.send({"success": 0, "message": err.message});
      });
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  return router;

})();
