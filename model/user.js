"use strict";
var ObjectId = require('mongodb').ObjectID;
class User {
  constructor(query, pullCallback) {
    this.pulled = false;

    query = _normalizeID(query);

    let self = this;
    
    let users = global.database.collection('users');

    users.find(query).toArray(function (err, docs) {
      if (!err) {
        if (docs.length > 1) {
          console.log('Could not find user with ID: ' + id);
          pullCallback(422);
        } if (docs.length == 0) {
          pullCallback(404);
        } else {
          self.pulled = true;
          let user = docs[0];
          for (var property in user) {
            self[property] = user[property]
          }
          pullCallback(200);
        }
      } else {
        console.log('Could not find user with ID: ' + id);
        pullCallback(500);
      }
    });   
  }
}

function _normalizeID(query) {
  if (query.id) query._id = ObjectId(query.id);
  delete query.id;
  return query;
}

module.exports = User;
