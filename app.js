var setup = require('./setup');

setup.database();
setup.express();

var User = require('./model/user');

global.app.get('/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});

global.app.get('/id', function (req, res) {
  var rafaelcosta = new User({id: '571fb4e37d03071c7ad0a0a4'}, function (status) {
    if (status == 200) {
      res.send(JSON.stringify(rafaelcosta));
    } else {
      res.send('FAILED');
    }
  }); 
});

global.app.get('/application', function (req, res) {
  var rafaelcosta = new User({application: 'me.rafaelcosta.sweettweet'}, function (status) {
    if (status == 200) {
      res.send(JSON.stringify(rafaelcosta));
    } else {
      res.send('FAILED');
    }
  });
});
