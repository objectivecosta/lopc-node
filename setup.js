var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/lopc';

MongoClient.connect(url, function(err, db) {
  if (!err) {
    console.log('Connected to DB');
    global.database = db;
  } else {
    console.log('Error connecting to DB: ' + err);
  }
});

var express = require('express');
global.app = express();

global.app.listen(3009);
