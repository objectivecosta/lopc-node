var Router = require('./router');
var authorization = require('./middleware/authorization');
var bodyParser = require('body-parser');

var DataStorage = require('./lib/dataStorage');

global.config = require('konfig')();

global.config.seed = {};
global.config.seed.seed = process.env.AUTH_SEED;

module.exports.data = function () {
  global.DataStorage = DataStorage;
}

module.exports.express = function () {
  var express = require('express');
  global.app = express();
  global.app.use(bodyParser.json());
  global.app.use(authorization);
  global.router = new Router(global.app);
  var port = process.env.PORT || global.config.app.port;
  global.app.listen(port);
}
