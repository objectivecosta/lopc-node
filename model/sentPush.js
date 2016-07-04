"use strict";
var ObjectId = require('mongodb').ObjectID;

class SentPush {

  static collectionName() {
    return "sentPushes";
  }

  static collection() {
    return global.database.collection(SentPush.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  save(callback) {
    let sentPushes = SentPush.collection();
    sentPushes.save(this, {w:1}, callback);
  }

  static pushesForUser(userId, serialise, callback) {
    let sentPushes = SentPush.collection();
    sentPushes.find({user : userId}).toArray(function (err, docs) {
      if (!err) {
        if (serialise == true) callback(null, _createPushesFromDocs(docs));
        else callback(null, docs);
      } else {
        console.log('Error fetching pushes: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createPushesFromDocs(docs) {
  var pushes = [];
  for (var pushEntry of docs) {
    pushes.push(new SentPush(pushEntry));
  }
  return pushes;
}

module.exports = SentPush;
