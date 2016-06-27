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

var Authentication = require('./middleware/authentication');

global.app.use('/c/*', Authentication.client);
global.app.use('/s/*', Authentication.server);
global.app.use('/a/*', Authentication.admin);

global.router.addRoute('GET', '/a/apps', AppController.allApps);

global.router.addRoute('POST', '/s/push', PushController.send);
global.router.addRoute('POST', '/c/device', UserController.create);

global.router.addRoute('GET', '/a/device', UserController.index);
global.router.addRoute('POST', '/a/device/query', UserController.search);
global.router.addRoute('GET', '/a/device/:id', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  git.getLastTag(function (err, tag) {
    if (err && !tag) tag = 'UNKNOWN';
    res.json({
      projectName : 'Low Orbit Push Cannon',
      projectVersion: tag
    });
  });
});
