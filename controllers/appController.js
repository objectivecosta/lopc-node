"use strict";

var App = require('../model/app');
var AdminUser = require('../model/adminUser');

class AppController {
  static allApps(req, res) {
    var username = req.query.username;

    if (!req.query.username) {
      res.status(400).json({result: 'NOK', error: 'Bad request'});
      return;
    }

    AdminUser.findOne({username : username}, function (err, adminUser) {
      if (err) {
        res.status(500).json({result: 'NOK', error: err});
      } else {
        var appIds = [];
        for (var appId of user.apps) {
          appIds.push(global.mongoose.Types.ObjectId(appId))
        }

        var query   = {'_id': { $in: appIds}}
        var fields  = { name: 1, description: 1 };

        App.find(query, fields, function(err, apps) {
          if (err) {
            res.status(500).json({result: 'NOK', error: err});
          } else {
            res.json(apps);
          }
        });

      }
    });
  }
}

module.exports = AppController;
