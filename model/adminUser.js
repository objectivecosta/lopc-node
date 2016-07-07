"use strict";
var ObjectId = require('mongodb').ObjectID;

var schema = new global.mongoose.Schema({
  username: String,
  password: String,
  apps: [String],
  salt: String
}, {collection: 'adminUsers'});

module.exports = global.mongoose.model('AdminUser', schema);
