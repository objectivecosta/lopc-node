require('./setup');

var User = require('./model/user');

global.app.get('/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});

global.app.get('/:id', function (req, res) {
  var rafaelcosta = new User('571fb4e37d03071c7ad0a0a4', function (success) {
    if (success) {
      res.send(JSON.stringify(rafaelcosta));
    } else {
      res.send('FAILED');
    }
  }); 
});
