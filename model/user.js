"use strict";
var ObjectId = require('mongodb').ObjectID;

class User {

  static collectionName() {
    return "users";
  }

  static collection() {
    return global.database.collection(User.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  save(callback) {
    let users = User.collection();
    users.save(this, {w:1}, callback);
  }

  static validate(user) {
    if (!user.deviceType || !user.deviceToken || !user.app) return false;
    return true;
  }

  static usersForQuery(query, serialise, callback) {
    let users = User.collection();

    users.find(query).toArray(function (err, docs) {
      if (!err) {
        if (serialise == true) callback(null, _createUsersFromDocs(docs));
        else callback(null, docs);
      } else {
        console.log('Error fetching users: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createUsersFromDocs(docs) {
  var users = [];
  for (var userEntry of docs) {
    users.push(new User(userEntry));
  }
  return users;
}

module.exports = User;
