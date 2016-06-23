"use strict";

var User = require('../model/user');

var ObjectId = require('mongodb').ObjectId;

class UserController {

  static index(req, res) {
    User.usersForQuery({}, false, function (err, users) {
      if (err) res.status(500).json(result: 'NOK', error:  err);
      else res.json(users);
    });
  }

  static search(req, res) {
    User.usersForQuery(req.body.query, false, function (err, users) {
      if (err) res.status(500).json(result: 'NOK', error:  err);
      else res.json(users);
    });
  }

  static create(req, res) {

    if (!req.query.appId) {
      res.status(400).json({result : 'NOK', error: 'Invalid request (no appId)'});
      return;
    }

    var appId = req.query.appId;

    if (!req.body.deviceToken || !req.body.deviceType || !req.body.deviceOS || !req.body.deviceOSVersion) {
      res.status(400).json({result : 'NOK', error: 'Invalid request'});
      return;
    }

    var count = 0;
    for (var key in req.body) {
      if (req.body.hasOwnProperty(req.body)) count++;
    }

    if (count > 5) {
      res.status(400).json({result : 'NOK', error: 'Invalid request (too many fields)'});
      return;
    }

    var saveCallback = function (err, data) {
      if (err) res.status(500).json({result : 'NOK', error: 'Database failed to save'});
      else res.json({result : 'OK'});
    }

    User.usersForQuery({deviceToken : req.body.deviceToken}, false, function (err, users) {
      if (err) {
        res.status(500).json({result : 'NOK', error: 'Could not fetch users from DB.'});
      } else {
        if (users.length == 0) {
          var user = new User(req.body);
          user.app = appId;
          user.save(saveCallback);
        } else if (users.length == 1) {
          var user = users[0];
          (new User(user)).updateWith(req.body, appId, saveCallback);
        } else {
          res.status(500).json({result : 'NOK', error: 'Database inconsistensy (code 5012)'});
        }
      }
    });
  }

  static show(req, res) {
    User.usersForQuery({_id : new ObjectId(req.params.id)}, false, function (err, users) {
      if (err) {
        res.status(500).json({result : 'NOK', error: 'Could not fetch users from DB.'});
      } else {
        if (users.length != 1) {
          res.status(500).json({result : 'NOK', error: 'Too many/few users found.'});
        } else {
          res.json(users[0]);
        }
      }
    });
  }
}

module.exports = UserController;
