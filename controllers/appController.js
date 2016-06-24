"use strict";

var App = require('../model/app');

class AppController {
  static allApps(req, res) {
    var username = req.query.username;
    App.appsForUsername(username, function (err, apps) {
      if (err) {
        res.json({result: 'NOK', error: err});
      } else {
        if (apps.length == 0) {
          res.json({result: 'NOK', error: 'No apps found for username'});
        } else {
          res.json(apps);
        }
      }
    });

  }
}

module.exports = AppController;
