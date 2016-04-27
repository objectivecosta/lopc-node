var setup = require('./setup');

setup.database();
setup.express();

var User = require('./model/user');
var UserController = require('./controllers/userController');


global.router.addRoute('POST', '/device', UserController.create); 

global.router.addRoute('GET','/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});

//global.app.get('/id', function (req, res) {
//  var rafaelcosta = new User({id: '571fb4e37d03071c7ad0a0a4'}, function (status) {
//    if (status == 200) {
//      res.send(JSON.stringify(rafaelcosta));
//    } else {
//      res.send('FAILED');
//    }
//  }); 
//});

//global.app.get('/application', function (req, res) {
//  User.usersForQuery({application: 'me.rafaelcosta.sweettweet'}, function (err, users) {
//    if (!err) {
//      res.send(JSON.stringify(users));
//    } else {
//      res.send('ERROR');
//    }
//  });
//});
