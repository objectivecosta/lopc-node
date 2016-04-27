var crypto = require('crypto');

module.exports = function (req, res, next) {
  var identifier = req.get('identifier');
  var authorization = req.get('authorization');

  var seed = global.config.seed.seed;
  var composition = identifier + seed;
  var expectedKey = crypto.createHash('sha256').update(composition).digest('hex');

  if (authorization == expectedKey) {
    next();
  } else {
    res.status(403).json({result: 'NOK', status: 403, message: 'Unauthorized'});
  }
}
