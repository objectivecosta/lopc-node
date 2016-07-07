"use strict";
var ObjectId = require('mongodb').ObjectID;

var schema = new global.mongoose.Schema({
  sent: Number,
  failedToSend: Number,
  audience: Number,
  payload: {}
}, {collection : 'sentPushes'});

module.exports = global.mongoose.model('SentPush', schema);
