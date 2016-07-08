"use strict";
var ObjectId = require('mongodb').ObjectID;

module.exports = global.mongoose.model('Channel', {
  name: String,
  appId: String,
  subscribers: [String]
});
