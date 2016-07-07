'use strict';

class Preflight {
  static inject(req, res, next) {
    if (req.method == "OPTIONS") {
      res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      res.send('OK');
    } else {
      next();
    }
  }
}

module.exports = Preflight;
