"use strict";

var ApplePushNotificationService = require('../lib/apns');

var App = require('./model/app');
var User = require('./model/user');

var connections = [];

class PushController {

  static send(req, res) {
    var payload = req.body;
    var appId = req.query.appId;
    var userId = req.query.userId;

    var actualSendCallback = function (err, sentPayload) {
      if (err) {
        res.json({result: 'NOK', error: err});
      } else {
        res.json({result: 'OK'});
      }
    }

    if (!ApplePushNotificationService.hasConnection(appId)) {
      App.appsForQuery({_id : new ObjectId(appId)}, true, function (err, apps) {
        if (err || apps.length != 1) {
          res.json({result: 'NOK', error: 'Error fetching app from database'});
        } else {
          var app = apps[0];
          var developmentPushCertificate = app.developmentPushCertificate;

          ApplePushNotificationService.connect(appId, {
            pfx: developmentPushCertificate,
            port: 2195
          });

          _actualSend(appId, userId, payload, actualSendCallback);
        }
      });
    } else {
      _actualSend(appId, userId, payload, actualSendCallback);
    }
  }

}

function _actualSend(appId, userId, payload, callback) {
  User.usersForQuery({_id : new ObjectId(userId)}, true, function (err, users) {
    if (err || users.length != 1) {
      res.json({result: 'NOK', error: 'Error fetching user from database'});
    } else {
      var user = users[0];
      var token = user.deviceToken;
      payload._user = user;
      ApplePushNotificationService.send(appId, token, payload, function (err, sentPayload) {
        if (err) {
          console.log("#_actualSend error: " + err);
          callback(err, null);
        } else {
          console.log("#_actualSend sent!");
          callback(null, sentPayload);
        }
      });
    }
  });


}

module.exports = PushController;
