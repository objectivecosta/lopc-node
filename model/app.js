"use strict";
var ObjectId = require('mongodb').ObjectID;
var AdminUser = require('./adminUser');

module.exports = global.mongoose.model('App', {
  name: String,
  description: String,
  developmentPushCertificate: Buffer,
  productionPushCertificate: Buffer,
  appClientToken: String,
  appServerToken: String
});
