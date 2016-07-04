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
//
// setTimeout(function () {
//   var fs = require("fs");
//   var App = require('./model/app');
//   var file = fs.readFileSync('/Users/rafaelcosta/Documents/rJenkins_Production_Push.p12');
//
//   App.appsForQuery({}, true, function (err, apps) {
//     if (err) console.log("ERROR: " + err);
//     var app = apps[0];
//     app.productionPushCertificate = file;
//     app.save();
//   });
// }, 3000)


var UserController = require('./controllers/userController');
var PushController = require('./controllers/pushController');
var AppController = require('./controllers/appController');

global.router.addRoute('GET', '/apps', AppController.allApps);

global.router.addRoute('POST', '/push', PushController.send);

global.router.addRoute('POST', '/device', UserController.create);
global.router.addRoute('GET', '/device', UserController.index);
global.router.addRoute('POST', '/device/query', UserController.search);
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
