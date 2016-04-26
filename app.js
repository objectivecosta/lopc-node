require('./setup');

global.app.get('/info', function (req, res) {
  res.send('Low Orbit Push Cannon');
});


