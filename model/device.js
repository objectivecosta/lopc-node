"use strict";
var ObjectId = require('mongodb').ObjectID;

class Device {

  static collectionName() {
    return "devices";
  }

  static collection() {
    return global.database.collection(Device.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  updateWith(json, app, callback) {
    this.deviceToken = json.deviceToken;
    this.deviceType = json.deviceType;
    this.deviceOS = json.deviceOS;
    this.deviceOSVersion = json.deviceOSVersion;
    this.deviceBadgeNumber = 0;
    this.app = app;
    this.deviceLastActiveAt = "" + (new Date()).toISOString();
    this.save(callback);
  }

  save(callback) {
    let devices = Device.collection();
    devices.save(this, {w:1}, callback);
  }

  static validate(device) {
    if (!device.deviceToken || !device.deviceType || !device.deviceOS || !device.deviceOSVersion || !device.app) return false;
    return true;
  }

  static devicesForQuery(query, serialise, callback) {
    let devices = Device.collection();

    devices.find(query).toArray(function (err, docs) {
      if (!err) {
        if (serialise == true) callback(null, _createDevicesFromDocs(docs));
        else callback(null, docs);
      } else {
        console.log('Error fetching devices: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createDevicesFromDocs(docs) {
  var devices = [];
  for (var deviceEntry of docs) {
    devices.push(new Device(deviceEntry));
  }
  return devices;
}

module.exports = Device;
