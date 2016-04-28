var crypto = require('crypto');

module.exports = function (req, res, next) {
  var identifier = req.get('identifier');
  var authorization = req.get('authorization');

  var seed = global.config.seed.seed;
  console.log('Seed: ' + seed);
  var composition = identifier + seed;

  var expectedKey = crypto.createHash('sha256').update(composition).digest('hex');

  console.log('Expected Key: ' + expectedKey);
  console.log('Actual Key: ' + authorization);

  if (authorization == expectedKey) {
    next();
  } else {
    res.status(403).json({result: 'NOK', status: 403, message: 'Unauthorized'});
  }
}
