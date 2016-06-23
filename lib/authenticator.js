"use strict";

var App = require('../model/app');
var User = require('../model/user');
var AdminUser = require('../model/adminUser');

class Authenticator {
  static isValidAdminUserRequest(req, res, callback) {

  }

  static isValidUserRequest(req, res, callback) {

  }

  static isValidAppRequest(req, res, callback) {

  }

  static isValidApp(appId, appSecret, callback) {
    App.appsForQuery({_id : new ObjectId(appId), appSecret : appSecret}, true, function (err, apps) {
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

  static isValidUser(deviceToken, appId, callback) {
    User.usersForQuery({deviceToken : deviceToken, appId : appId}, true, function (err, users) {
      if (err) {
        callback(err, false);
      } else {
        if (users.length != 1) {
          callback('Too many/few users found (authenticator)', false);
        } else {
          callback(null, true);
        }
      }
    });
  }
}
