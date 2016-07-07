"use strict";

var Device = require('../model/device');
var ObjectId = require('mongodb').ObjectId;

function log(string) {
  console.log(`[DeviceController] ${string}`);
}

class DeviceController {

  static index(req, res) {
    Device.find({}, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }

  static search(req, res) {
    Device.find(req.body.query, function (err, devices) {
      if (err) res.status(500).json({result: 'NOK', error: err});
      else res.json(devices);
    });
  }

  static create(req, res) {

    if (!req.query.appId) {
      log("No appId in +create request");
      res.status(400).json({result : 'NOK', error: 'Invalid request (no appId)'});
      return;
    }

    var appId = req.query.appId;

    if (!req.body.deviceToken || !req.body.deviceType || !req.body.deviceOS || !req.body.deviceOSVersion) {
      log("Invalid +create request params");
      res.status(400).json({result : 'NOK', error: 'Invalid request'});
      return;
    }

    var count = 0;
    for (var key in req.body) {
      if (req.body.hasOwnProperty(req.body)) count++;
    }

    if (count > 5) {
      log("Too many fields in +create");
      res.status(400).json({result : 'NOK', error: 'Invalid request (too many fields)'});
      return;
    }

    req.body.deviceBadgeNumber = 0;
    req.body.deviceLastActiveAt = new Date();
    Device.findOneAndUpdate({deviceToken : req.body.deviceToken}, req.body, {upsert:true}, function(err, device) {
      if (err) res.status(500).json({result : 'NOK', error: 'Database failed to save'});
      else res.json({result : 'OK'});

      if (err) log("Error adding/updating device");
    });
  }

  static show(req, res) {

    Device.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(500).json({result : 'NOK', error: 'Could not fetch users from DB.'});
      } else {
        res.json(user);
      }
    });
  }
}

module.exports = DeviceController;
