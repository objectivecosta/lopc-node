"use strict";

var fs = require('fs');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var Router = require('./router');
var https = require('https');

class Web {
  static startup() {
    // Enable API usage by any website
    _addAccessControlAllow();
    _addJSONBodyParser();
    _setupRouter();
    _startServerResetTimer();
    _startServer();
  }
}

function _addAccessControlAllow() {
  global.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

function _addJSONBodyParser() {
  global.app.use(bodyParser.json());
}

function _setupRouter() {
  global.router = new Router(global.app);
}

function _startServer() {
  var serverOptions = {
    key  : fs.readFileSync(global.config.ssl.certificateKeyPath),
    cert : fs.readFileSync(global.config.ssl.certificatePath)
  };
  global.server = https.createServer(serverOptions, global.app).listen(3000, function () {
    console.log('LOPC is now listening on port 3000');
  });
}

function _startServerResetTimer() {
  setInterval(function () {
    console.log("Restarting webserver (to reload certificates)");
    global.server.close();
    _startServer();
  }, global.config.ssl.reloadInterval);
}

module.exports = Web;
