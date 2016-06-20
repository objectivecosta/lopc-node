var express = require('express');
global.app = express();
global.app.use(bodyParser.json());

global.router = new Router(global.app);

var port = process.env.PORT || global.config.app.port;

global.app.listen(port);

var User = require('./model/user');
var AdminUser = require('./model/adminUser');

var UserController = require('./controllers/userController');

global.router.addRoute('POST', '/device', UserController.create);
global.router.addRoute('GET', '/device', UserController.index);
global.router.addRoute('GET', '/device/:id', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});
