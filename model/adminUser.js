"use strict";
var ObjectId = require('mongodb').ObjectID;

module.exports = global.mongoose.model('AdminUser', {
  username: String,
  password: String,
  apps: [String],
  salt: String
});
