"use strict";

var ApplePushNotificationService = require('../lib/apns');

var connections = [];

class PushController {

  static send(req, res) {
    var payload = req.body;
    var appId = req.query.appId;
    var token = req.query.token;

    if (!ApplePushNotificationService.hasConnection(appId)) {
      ApplePushNotificationService.connect(appId, {
        pfx: "./certs/rJenkins_Push_Dev.p12",
        port: 2195
      });
    }

    console.log("json: " + JSON.stringify(payload));

    ApplePushNotificationService.send(appId, token, payload, function (err, sentPayload) {
      if (err) {
        console.log("ERROR: " + err);
        res.json({result: "NOK"});
      } else {
        console.log("SENT");
        res.json({result: "OK"});
      }
    });
  }

}

module.exports = PushController;
