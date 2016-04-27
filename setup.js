var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/lopc';
var Router = require('./router');
var authorization = require('./middleware/authorization');
var bodyParser = require('body-parser');

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
  global.app.use(bodyParser.json());
  global.app.use(authorization);
  global.router = new Router(global.app);
  global.app.listen(global.config.app.port);
}

