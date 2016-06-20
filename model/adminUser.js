"use strict";
var ObjectId = require('mongodb').ObjectID;

class AdminUser {

  static collectionName() {
    return "adminUsers";
  }

  static collection() {
    return global.database.collection(AdminUser.collectionName());
  }

  constructor(object) {
    for (var property in object) {
      this[property] = object[property];
    }
  }

  save(callback) {
    let adminUsers = AdminUser.collection();
    adminUsers.save(this, {w:1}, callback);
  }

  static usersForQuery(query, callback) {
    let adminUsers = AdminUser.collection();

    adminUsers.find(query).toArray(function (err, docs) {
      if (!err) {
        callback(null, _createUsersFromDocs(docs));
      } else {
        console.log('Error fetching adminUsers: ' + err);
        callback(err, null);
      }
    });
  }
}

function _createUsersFromDocs(docs) {
  var users = [];
  for (userEntry of docs) {
    users.push(new AdminUser(userEntry));
  }
  return users;
}

module.exports = AdminUser;
