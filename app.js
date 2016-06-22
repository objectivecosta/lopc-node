// Setup:

var express = require('express');
global.app = express();

var bodyParser = require('body-parser');

global.app.use(bodyParser.json());

global.config = require('konfig')();

require('./lib/mongo')();

var ObjectId = require('mongodb').ObjectId;

var Router = require('./router');
var ApplePushNotificationService = require('./lib/apns.js');

global.router = new Router(global.app);
global.app.listen(3000);

// Routes:

var User = require('./model/user');
var AdminUser = require('./model/adminUser');
var App = require('./model/app');

var UserController = require('./controllers/userController');
var PushController = require('./controllers/pushController');

var git = require('./git');

global.router.addRoute('POST', '/push', PushController.send);

global.router.addRoute('POST', '/device', UserController.create);
global.router.addRoute('GET', '/device', UserController.index);
global.router.addRoute('GET', '/device/:id', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  console.log("Got a hit on /info");
  git.getLastTag(function (err, tag) {
    if (err && !tag) tag = 'UNKNOWN';
    res.json({
      projectName : 'Low Orbit Push Cannon',
      projectVersion: tag
    });
  });
});
