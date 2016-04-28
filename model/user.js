"use strict";
var ObjectId = require('mongodb').ObjectID;
class User {
  constructor(object) {
    object = _normalizeID(object);
    for (var property in object) {
      this[property] = object[property];
    } 
  }

  save(callback) {
    let users = global.database.collection('users');
    if (!this.subscriptions) this.subscriptions = []
    users.save(this, {w:1}, callback);
  }

  static usersForQuery(query, callback) {
    let users = global.database.collection('users');

    query = _normalizeID(query);

    users.find(query).toArray(function (err, docs) {
      if (!err) {
        callback(null, _createUsersFromDocs(docs));
      } else {
        console.log('Error fetching users: ' + err);
        callback(err, null);
      }  
    });
  }

  static validate(object) {
    if (!object._id || !object.type) {
      return false;
    } else {
      return true;
    }
  }
}

function _createUsersFromDocs(docs) {
  var users = [];
  for (var dbUser of docs) {
    var user = new User(null, null);
    for (var property in dbUser) {
      user[property] = dbUser[property];
    }
    user.pulled = true;
    users.push(user);
  }

  return users;
}

function _normalizeID(query) {
  if (query.id) query._id = ObjectId(query.id);
  delete query.id;
  return query;
}

module.exports = User;
