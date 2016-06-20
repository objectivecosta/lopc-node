"use strict";

var User = require('../model/user');

class UserController {

  static index(req, res) {
    User.usersForQuery({}, false, function (err, users) {
      res.json(users);
    });
  }

  static create(req, res) {

  }

  static show(req, res) {
    
  }
}

module.exports = UserController;
