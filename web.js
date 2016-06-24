"use strict";

var fs = require('fs');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var Router = require('./router');
var https = require('https'); 

class Web {
  static startup() {
    
    // Enable API usage by any website
    global.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    global.app.use(bodyParser.json());

    global.router = new Router(global.app);

    var startServer = function () {

      var serverOptions = {
        key  : fs.readFileSync(global.config.ssl.certificateKeyPath),
        cert : fs.readFileSync(global.config.ssl.certificatePath)
      };

      global.server = https.createServer(serverOptions, global.app).listen(3000, function () {
        console.log('Started listening on port 3000');
      });
    }

    setInterval(function () {
      console.log("Restarting webserver (to reload certificates)");
      global.server.close();
      startServer();
    }, global.config.ssl.reloadInterval);

    startServer();
  }
}

module.exports = Web;
