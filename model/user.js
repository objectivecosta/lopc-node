"use strict";
var ObjectId = require('mongodb').ObjectID;
class User {
  constructor(query, pullCallback) {
    this.pulled = false;

    if (query == null) return;

    query = _normalizeID(query);

    let self = this;
    
    let users = global.database.collection('users');

    users.find(query).toArray(function (err, docs) {
      if (!err) {
        _processData(docs, self, pullCallback);
      } else {
        console.log('Could not find user with ID: ' + id);
        pullCallback(500);
      }
    });   
  }

  static usersForQuery(query, callback) {
    let users = global.database.collection('users');
    users.find(query).toArray(function (err, docs) {
      if (!err) {
        callback(null, _createUsers(docs));
      } else {
        console.log('Error fetching users: ' + err);
        callback(err, null);
      }  
    });
  }
}

function _createUsers(docs) {
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

function _processData(data, user, pullCallback) {
  if (data.length > 1) {
    console.log('Could not find user with ID: ' + id);
    pullCallback(422);
  } if (data.length == 0) {
    pullCallback(404);
  } else {
    user.pulled = true;
    let dbUser = data[0];
    for (var property in dbUser) {
      user[property] = dbUser[property]
    }
    pullCallback(200);
  }
}

function _normalizeID(query) {
  if (query.id) query._id = ObjectId(query.id);
  delete query.id;
  return query;
}

module.exports = User;
