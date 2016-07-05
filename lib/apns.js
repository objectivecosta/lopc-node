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

  static hasConnection(name) {
    if (!connections[name]) return false;
    return true;
  }

  static send(name, token, payload, callback) {
    if (connections[name]) {
      var connection = connections[name];
      var notification = new apn.Notification();
      var device = new apn.Device(token);

      var newBadgeNumber = 0;

      if (payload.badge == '+') {
        // Increase the badge number
        newBadgeNumber = payload._device.deviceBadgeNumber + 1;
      }

      if (!isNaN(payload.badge)) {
        newBadgeNumber = payload.badge;
      }

      payload._device.deviceBadgeNumber = newBadgeNumber;
      payload._device.save(function (err, data) {});
      notification.badge = newBadgeNumber;
      notification.sound = "default";
      notification.alert = payload.alert;

      connection.pushNotification(notification, device);
      callback(null, payload);
    } else {
      callback('Invalid connection name', null);
    }
  }
}

module.exports = ApplePushNotificationService;
