var setup = require('./setup');

setup.express();

var User = require('./model/user');
var UserController = require('./controllers/userController');

global.router.addRoute('POST', '/device', UserController.create);
global.router.addRoute('GET', '/device', UserController.show);

global.router.addRoute('GET','/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});
