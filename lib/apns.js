"use strict";

var apn = require('apn');
var uuid = require('node-uuid');

var connections = {};

class ApplePushNotificationService {
  static connect(name, options) {
    if (!options) {
      options = { };
    }

    if (!name) {
      name = uuid.v4();
    }

    connections[name] = new apn.Connection(options);

    return name;
  }

  static send(name, user, payload, callback) {
    if (connections[name]) {
      var connection = connections[name];
      var notification = new apn.Notification();
      var device = new apn.Device(user);

      notification.badge = 0; //TODO: Add badge incrementation
      notification.sound = "default";
      notification.alert = payload.alert;
      notification.payload = payload.payload;

      connection.pushNotification(notification, device);
      callback(null, payload);
    } else {
      callback('Invalid connection name', null);
    }
  }
}

module.exports = ApplePushNotificationService;
