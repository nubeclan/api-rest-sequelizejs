/**
 * API REST Genericos...
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

  //Leyendo datos de una tabla
  router.get('/:table', function(req, res) {
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

      var read_query = "SELECT * FROM `" + (req.params.table) + "` LIMIT " + page_limit + " OFFSET " + offset;
    } else {
      var read_query = "SELECT * FROM `" + (req.params.table) + "`";
    }
    sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
      if (!rows.length) {
        res.status(404);
        res.json({"success": 0, "data": "No rows found"});
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

  //Leyendo un dato de una tabla
  router.get('/:table/:id', function(req, res) {
    sequelize.query("SHOW KEYS FROM `" +  req.params.table + "` WHERE Key_name = 'PRIMARY'", {type: sequelize.QueryTypes.SELECT}).then(function(keys) {
      var primary_key = keys[0].Column_name;
      sequelize.query("SELECT * FROM `" + req.params.table + "` WHERE `" + primary_key + "` = " + mysql_clean(req.params.id), {type: sequelize.QueryTypes.SELECT}).then(function(rows) {
        if (!rows.length) {
          res.status(404);
          res.json({"success": 0, "data": "No rows found"});
        }
        res.status(200);
        res.json({"success": 1, "data": rows});
      }).catch(function(err) {
        res.status(404);
        res.send({"success": 0, "message": err.message});
      });
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Insertando datos en un tabla
  router.post('/:table', function(req, res) {
    if (JSON.stringify(req.body) == '{}') {
      res.status(404);
      res.json({"success": 0, "message": "Parameters missing"});
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
    sequelize.query("INSERT INTO `" + (req.params.table) + "` (" + keys + ") VALUES (" + values + ")", {type: sequelize.QueryTypes.INSERT}).then(function(id) {
      res.status(201);
      res.json({"success": 1, "id": id});
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Actualizando datos en una tabla
  router.put('/:table/:id', function(req, res) {
    sequelize.query("SHOW KEYS FROM `" + (req.params.table) + "` WHERE Key_name = 'PRIMARY'", {type: sequelize.QueryTypes.SELECT}).then(function(keys) {
      var primary_key = keys[0].Column_name;
      if (JSON.stringify(req.body) == '{}') {
        res.status(200);
        res.json({"success": 0, "message": "Parameters missing"});
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
      sequelize.query("UPDATE `" + (req.params.table) + "` SET " + update_string + " WHERE `" + primary_key + "` = " + mysql_clean(req.params.id), {type: sequelize.QueryTypes.UPDATE}).then(function() {
        res.status(200);
        res.json({"success": 1, "message": "Updated"});
      }).catch(function(err) {
        res.status(404);
        res.send({"success": 0, "message": err.message});
      });
    }).catch(function(err) {
      res.status(404);
      res.send({"success": 0, "message": err.message});
    });
  });

  //Eliminando un dato de una tabla
  router.delete('/:table/:id', function(req, res) {
    sequelize.query("SHOW KEYS FROM `" +  req.params.table + "` WHERE Key_name = 'PRIMARY'", {type: sequelize.QueryTypes.SELECT}).then(function(keys) {
      var primary_key = keys[0].Column_name;
      sequelize.query("DELETE FROM `" +  req.params.table + "` WHERE `" + primary_key + "` = " + mysql_clean(req.params.id), {type: sequelize.QueryTypes.DELETE}).then(function() {
        res.status(200);
        res.json({"success": 1, "message": "Deleted"});
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
