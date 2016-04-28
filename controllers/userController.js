"use strict";

var User = require('../model/user');

class UserController {
  static create(req, res) {
    if (User.validate(req.body) == false) {
      res.json({result: 'NOK', status: 400, message: 'Bad request'});
    } else {
      var user = new User(req.body);
      user.application = req.get('identifier');
      user.last_online = (new Date()).getTime();
      user.save(function (err, data) {
        if (!err) {
          res.json({result: 'OK', status: 200});
        } else {
          res.json({result: 'NOK', status: 500, message: err});
        }
      });
    }
  }
}

module.exports = UserController;
