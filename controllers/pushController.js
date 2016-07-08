"use strict";

var ApplePushNotificationService = require('../lib/apns');

var App = require('../model/app');
var Device = require('../model/device');
var Channel = require('../model/channel');
var SentPush = require('../model/sentPush');
var uuid = require('node-uuid');

var ObjectId = require('mongodb').ObjectId;

var pushCallback = function (err, notSent, sent, total) {
  if (err) {
    res.status(500).json({result : "NOK", error: err});
  } else {
    var sentPush = new SentPush();

    delete payload._device;

    sentPush.sent = sent;
    sentPush.failedToSend = notSent;
    sentPush.audience = total;
    sentPush.payload = payload;

    sentPush.save(function (err, saved) {
      if (err) res.json({result: 'NOK', error: err});
      else res.json({result : "OK", id: saved._id});
    });
  }

}

class PushController {

  static sendToChannel(req, res) {
    var payload = req.body.payload;
    var appId = req.query.appId;
    var env = req.query.env;
    var channel = req.params.channel;

    if (!channel || !payload || !appId || !env) {
      res.status(400).json({result : "NOK", error: 'Missing params'});
      return;
    }

    if (!ApplePushNotificationService.hasConnection(appId+"-"+env)) {
      _initiateAPNSConnection(function (err) {
        if (!err) _sendByChannel(appId, env, channel, payload, pushCallback);
        else res.json({result: 'NOK', error: 'Error fetching app from database'});
      });
    } else {
      _sendByChannel(appId, env, channel, payload, pushCallback)
    }

  }

  static send(req, res) {
    var query = req.body.query;
    var payload = req.body.payload;
    var appId = req.query.appId;
    var env = req.query.env;

    if (!query || !payload || !appId || !env) {
      res.status(400).json({result : "NOK", error: 'Missing params'});
      return;
    }

    if (!ApplePushNotificationService.hasConnection(appId+"-"+env)) {
      _initiateAPNSConnection(function (err) {
        if (!err) _sendByQuery(appId, env, query, payload, pushCallback);
        else res.json({result: 'NOK', error: 'Error fetching app from database'});
      });
    } else {
      _sendByQuery(appId, env, query, payload, pushCallback);
    }
  }

  static reach(req, res) {
    Device.find(req.body.query, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }
}

function _sendByQuery(appId, env, query, payload, callback) {
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

function _sendByChannel(appId, env, channel, payload, callback) {
  Channel.findOne({name : channel, app : appId}, function (err, channel) {
    if (err) {
      callback('Error fetching channel from DB', 0, 0, 0);
    } else {
      var sent = 0;
      var notSent = 0;
      var total = channel.subscribers.length;
      for (var subscriber of channel.subscribers) {
        ApplePushNotificationService.send(appId + "-" + env, subscriber, payload, function (err, sentPayload) {
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

function _initiateAPNSConnection(appId, env, callback) {
  App.findById(appId, function (err, app) {
    if (err) {
      callback(err);
    } else {
      var certificate;
      if (env == "d") certificate = app.developmentPushCertificate;
      else if (env == "p") certificate = app.productionPushCertificate;

      var isProd = false;
      if (env == "p") isProd = true;

      ApplePushNotificationService.connect(appId+"-"+env, {
        pfx: certificate,
        port: 2195,
        production: isProd
      });

      callback();
    }
  });
}

module.exports = PushController;
