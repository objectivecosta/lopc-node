// Setup Websocket


// Setup Webserver:

var express = require('express');
var Web = require('./lib/web');
var git = require('./lib/git');

global.app = express();

global.config = require('konfig')();

require('./lib/mongo')();

Web.startup();

// Routes:

var UserController = require('./controllers/userController');
var PushController = require('./controllers/pushController');
var AppController = require('./controllers/appController');

global.router.addRoute('GET', '/u/apps', AppController.allApps);

global.router.addRoute('POST', '/a/push', PushController.send);

global.router.addRoute('POST', '/a/device', UserController.create);
global.router.addRoute('GET', '/u/device', UserController.index);
global.router.addRoute('POST', '/u/device/query', UserController.search);
global.router.addRoute('GET', '/u/device/:id', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  git.getLastTag(function (err, tag) {
    if (err && !tag) tag = 'UNKNOWN';
    res.json({
      projectName : 'Low Orbit Push Cannon',
      projectVersion: tag
    });
  });
});
