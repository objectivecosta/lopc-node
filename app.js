var express = require('express');
global.app = express();
var bodyParser = require('body-parser');
global.app.use(bodyParser.json());

var querystring = require("querystring");

global.config = require('konfig')();

var MongoClient = require('mongodb').MongoClient
var url = `mongodb://${querystring.escape(global.config.mongodb.username)}:${querystring.escape(global.config.mongodb.password)}@${global.config.mongodb.server}:${global.config.mongodb.port}/${global.config.mongodb.database}`;
MongoClient.connect(url, function (err, db) {
  if (err) console.log('ERROR: ' + err);
  else console.log('Connected to DB');
  global.database = db;
});

var Router = require('./router');

global.router = new Router(global.app);

var port = 9002;

global.app.listen(port);

var User = require('./model/user');
var AdminUser = require('./model/adminUser');

var UserController = require('./controllers/userController');

var git = require('./git');

global.router.addRoute('POST', '/device', UserController.create);
global.router.addRoute('GET', '/device', UserController.index);
global.router.addRoute('GET', '/device/:id', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  git.getLastTag(function (err, tag) {
    if (err && !tag) tag = 'UNKNOWN';

    res.json({
      projectName : 'Low Orbit Push Cannon',
      projectVersion: tag
    });
  });
});
