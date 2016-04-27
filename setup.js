var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/lopc';

global.config = require('konfig')();

module.exports.database = function () {
  MongoClient.connect(url, function(err, db) {
    if (!err) {
      console.log('Connected to DB');
      global.database = db;
    } else {
      console.log('Error connecting to DB: ' + err);
    }
  });
}

module.exports.express = function () {
  var express = require('express');
  global.app = express();
  global.app.listen(3009);
}

module.exports.cli = function() {

}
