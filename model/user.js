"use strict";
var ObjectId = require('mongodb').ObjectID;
class User {
  constructor(id, pullCallback) {
    this.pulled = false;

    let self = this;
    let users = global.database.collection('users');
    users.find({_id: ObjectId(id)}).toArray(function (err, docs) {
      if (!err) {
        if (docs.length != 1) {
          console.log('Could not find user with ID: ' + id);
          pullCallback(false);
        } else {
          self.pulled = true;
          let user = docs[0];
          for (var property in user) {
            self[property] = user[property]
          }
          pullCallback(true);
        }
      } else {
        console.log('Could not find user with ID: ' + id);
        pullCallback(false);
      }
    });   
  }
}

module.exports = User;
