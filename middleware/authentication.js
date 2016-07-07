"use strict";

var AdminUser = require('../model/adminUser');
var App = require('../model/app');
var Device = require('../model/device');

function log(string) {
  console.log(`[Authentication] ${string}`);
}

class Authentication {
  static validate(req, res, next) {
    var authenticationType = req.get('x-authorization-type');

    if (authenticationType == 'device') {
      // Device authentication
      // For registering devices
      _validateDeviceAuth(req, res, next);
    } else if (authenticationType == 'user') {
      // User authentication
      // For admin purposes
      _validateUserAuth(req, res, next);
    } else if (authenticationType == 'app') {
      // App authentication
      // Also for admin purposes
      _validateAppAuth(req, res, next);
    } else {
      if (req.path == "/info") next();
      else res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
    }
  }
}

function _validateDeviceAuth(req, res, next) {
  if (!req.path.startsWith('/device')) {
    res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
  } else {

    if (!req.query.appId || !req.get('x-app-client-token')) {
      log("Missing fields for Device Auth");
      res.status(400).json({result: 'NOK', error: 'Missing fields'});
      return;
    }

    var appId = req.query.appId;
    var appClientToken = req.get('x-app-client-token');

    App.findById(appId, function (err, apps) {
      if (err) {
        log("Database error for Device Auth: " + err);
        res.status(500).json({result: 'NOK', error: 'Database error'});
      } else {
        if (app.appClientToken == appClientToken) {
          next();
        } else {
          log("Invalid client token for Device Auth: " + appClientToken);
          res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
        }
      }
    });
  }
}

function _validateUserAuth(req, res, next) {
  if (req.path.startsWith('/device')) {
    res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
  } else {
    next();
  }
}

function _validateAppAuth(req, res, next) {
  if (req.path.startsWith('/device')) {
    res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
  } else {

    if (!req.query.appId || !req.get('x-app-client-token')) {
      res.status(400).json({result: 'NOK', error: 'Missing fields'});
      return;
    }

    var appId = req.query.appId;
    var appServerToken = req.get('x-app-server-token');

    App.findById(appId, function(err, app) {
      if (err) {
        res.status(500).json({result: 'NOK', error: err});
      } else {
        if (app.appServerToken == appServerToken) {
          next();
        } else {
          res.status(403).json({result: 'NOK', error: 'Invalid authentication'});
        }
      }
    });
  }
}

module.exports = Authentication;
