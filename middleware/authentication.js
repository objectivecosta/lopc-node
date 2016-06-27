"use strict";

var Authenticator = require('../lib/authenticator');

class Authentication {
  static client(req, res, next) {
    Authenticator.isValidClientRequest(req, res, function (err, valid) {
      if (valid == true) {
        next();
      } else {
        if (err) res.status(500).json({result : 'NOK', error: err});
        else res.status(403).json({result : 'NOK', error: 'Invalid credentials'});
      }
    });
  }

  static server(req, res, next) {
    Authenticator.isValidServerRequest(req, res, function (err, valid) {
      if (valid == true) {
        next();
      } else {
        if (err) res.status(500).json({result : 'NOK', error: err});
        else res.status(403).json({result : 'NOK', error: 'Invalid credentials'});
      }
    });
  }

  static admin(req, res, next) {
    next();
  }
}
