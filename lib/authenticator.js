"use strict";

var App = require('../model/app');
var User = require('../model/user');
var AdminUser = require('../model/adminUser');

class Authenticator {
  static isValidAdminUserRequest(req, res, callback) {

  }

  static isValidClientRequest(req, res, callback) {
    Authenticator.isValidAppClient(req.query.appId, req.get('Client-Secret'), callback);
  }

  static isValidServerRequest(req, res, callback) {
    Authenticator.isValidAppServer(req.query.appId, req.get('Server-Secret'), callback);
  }

  static isValidAppServer(appId, appServerSecret, callback) {
    App.appsForQuery({_id : new ObjectId(appId), appServerSecret : appServerSecret}, true, function (err, apps) {
      if (err) {
        callback(err, false);
      } else {
        if (apps.length != 1) {
          callback('Too many/few apps found (authenticator)', false);
        } else {
          callback(null, true);
        }
      }
    });
  }

  static isValidAdminUser(username, password, callback) {

  }

  static isValidAppClient(appId, appClientSecret, callback) {
    App.appsForQuery({_id : new ObjectId(appId), appClientSecret : appClientSecret}, true, function (err, apps) {
      if (err) {
        callback(err, false);
      } else {
        if (apps.length != 1) {
          callback('Too many/few apps found (authenticator)', false);
        } else {
          callback(null, true);
        }
      }
    });
  }
}
