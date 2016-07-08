"use strict";
var ObjectId = require('mongodb').ObjectID;

module.exports = global.mongoose.model('Device', {
  deviceToken: String,
  deviceOSVersion: String,
  deviceOS: String,
  deviceType: String,
  app: String,
  deviceBadgeNumber: Number,
  deviceLastActiveAt: Date,
  devicePayload: {},
  channels: [String]
});
