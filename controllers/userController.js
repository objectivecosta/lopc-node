"use strict";

var User = require('../model/user');
var uuid = require('node-uuid');

class UserController {
  static create(req, res) {
    if (User.validate(req.body) == false) {
      res.json({result: 'NOK', status: 400, message: 'Bad request'});
    } else {
      var user = new User(req.body);
      user.application = req.get('identifier');
      user.last_online = (new Date()).getTime();
      global.DataStorage.save(user.id, user, function (err, data) {
        if (!err) {
          res.json({result: 'OK', status: 200});
        } else {
          res.json({result: 'NOK', status: 500, message: err});
        }
      });
    }
  }

  static show(req, res) {
    var id = req.get('id');
    global.DataStorage.get(id, function (err, data) {
      if (err) {
        res.json({result: 'NOK', status: 500, message: err});
      } else {
        res.json({result: 'OK', status: 200, data: data})	;
      }
    });
  }
}

module.exports = UserController;
