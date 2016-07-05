"use strict";

var Device = require('../model/device');
var ObjectId = require('mongodb').ObjectId;

class DeviceController {

  static index(req, res) {
    Device.devicesForQuery({}, false, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }

  static search(req, res) {
    Device.devicesForQuery(req.body.query, false, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }

  static create(req, res) {

    if (!req.query.appId) {
      res.status(400).json({result : 'NOK', error: 'Invalid request (no appId)'});
      return;
    }

    var appId = req.query.appId;

    if (!req.body.deviceToken || !req.body.deviceType || !req.body.deviceOS || !req.body.deviceOSVersion) {
      res.status(400).json({result : 'NOK', error: 'Invalid request'});
      return;
    }

    var count = 0;
    for (var key in req.body) {
      if (req.body.hasOwnProperty(req.body)) count++;
    }

    if (count > 5) {
      res.status(400).json({result : 'NOK', error: 'Invalid request (too many fields)'});
      return;
    }

    var saveCallback = function (err, data) {
      if (err) res.status(500).json({result : 'NOK', error: 'Database failed to save'});
      else res.json({result : 'OK'});
    }

    Device.devicesForQuery({deviceToken : req.body.deviceToken}, false, function (err, devices) {
      if (err) {
        res.status(500).json({result : 'NOK', error: 'Could not fetch devices from DB.'});
      } else {
        if (devices.length == 0) {
          var device = new Device(req.body);
          device.app = appId;
          device.save(saveCallback);
        } else if (devices.length == 1) {
          var device = devices[0];
          (new Device(device)).updateWith(req.body, appId, saveCallback);
        } else {
          res.status(500).json({result : 'NOK', error: 'Database inconsistensy (code 5012)'});
        }
      }
    });
  }

  static show(req, res) {
    User.usersForQuery({_id : new ObjectId(req.params.id)}, false, function (err, users) {
      if (err) {
        res.status(500).json({result : 'NOK', error: 'Could not fetch users from DB.'});
      } else {
        if (users.length != 1) {
          res.status(500).json({result : 'NOK', error: 'Too many/few users found.'});
        } else {
          res.json(users[0]);
        }
      }
    });
  }
}

module.exports = DeviceController;
