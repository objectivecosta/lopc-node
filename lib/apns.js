"use strict";

var apn = require('apn');
var uuid = require('node-uuid');

var connections = {};

class APNS {

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

      notification.badge = 0; //TODO: Add badge incrementation
      notification.sound = "default";
      notification.alert = payload.alert;
      notification.payload = payload.payload;

      connection.pushNotification(notification, user.id);
      callback(null, payload);
    } else {
      callback('Invalid connection name', null);
    }
  }
}

module.exports = APNS;
