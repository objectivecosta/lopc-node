"use strict";
var ObjectId = require('mongodb').ObjectID;

class StoredPush {

  static collectionName() {
    return "storedPushes";
  }

  static collection() {
    return global.database.collection(App.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  save(callback) {
    let storedPushes = StoredPush.collection();
    storedPushes.save(this, {w:1}, callback);
  }

  static pushesForUser(userId, callback) {
    let storedPushes = StoredPushcollection();

    storedPushes.find({userId : userId}).toArray(function (err, docs) {
      if (!err) {
        var pushes = [];
        for (var doc of docs) {
          pushes.push(doc.notification);
        }
        callback(null, pushes);
      } else {
        console.log('Error fetching pushes: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createAppsFromDocs(docs) {
  var apps = [];
  for (var appEntry of docs) {
    apps.push(new App(appEntry));
  }
  return apps;
}

module.exports = App;
