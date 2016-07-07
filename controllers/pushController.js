"use strict";

var ApplePushNotificationService = require('../lib/apns');

var App = require('../model/app');
var Device = require('../model/device');
var SentPush = require('../model/sentPush');
var uuid = require('node-uuid');

var ObjectId = require('mongodb').ObjectId;

class PushController {

  static send(req, res) {
    var query = req.body.query;
    var payload = req.body.payload;
    var appId = req.query.appId;
    var env = req.query.env;


    if (!query || !payload || !appId || !env) {
      res.status(400).json({result : "NOK", error: 'Missing params'});
      return;
    }

    var actualSendCallback = function (err, notSent, sent, total) {
      if (err) {
        res.status(500).json({result : "NOK", error: err});
      } else {
        var generatedUUID = uuid.v4();
        var push = new SentPush();
        push.sent = sent;
        push.failedToSend = notSent;
        push.audience = total;
        push.uuid = generatedUUID;

        push.save(function (err, docs) {
          if (err) res.json({result: 'UNKWN', error: err});
          else res.json({result : "OK", uuid: generatedUUID});
        });
      }

    }

    if (!ApplePushNotificationService.hasConnection(appId+"-"+env)) {
      App.findById(appId, function (err, app) {
        if (err) {
          res.json({result: 'NOK', error: 'Error fetching app from database'});
        } else {
          var certificate;
          if (env == "d") certificate = app.developmentPushCertificate.buffer;
          else if (env == "p") certificate = app.productionPushCertificate.buffer;

          var isProd = false;
          if (env == "p") isProd = true;

          ApplePushNotificationService.connect(appId+"-"+env, {
            pfx: certificate,
            port: 2195,
            production: isProd
          });

          _actualSend(appId, env, query, payload, actualSendCallback);
        }
      });
    } else {
      _actualSend(appId, env, query, payload, actualSendCallback);
    }
  }

  static reach(req, res) {
    Device.find(req.body.query, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }
}

function _actualSend(appId, env, query, payload, callback) {
  if (query.id) {
    var queryId = query.id;
    delete query.id;
    query._id = new ObjectId(queryId);
  }

  Device.find(query, function (err, devices) {
    if (err) {
      callback('Error fetching devices from DB', 0, 0, 0);
    } else {
      var sent = 0;
      var notSent = 0;
      var total = devices.length;

      for (var device of devices) {
        var token = device.deviceToken;
        payload._device = device;

        ApplePushNotificationService.send(appId + "-" + env, token, payload, function (err, sentPayload) {
          if (err) {
            notSent++;
          } else {
            sent++;
          }

          if ((sent + notSent) == total) {
            callback(null, notSent, sent, total);
          }
        });
      }
    }
  });
}


module.exports = PushController;
