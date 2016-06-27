"use strict";

var Authenticator = require('../lib/authenticator');

class Authentication {
  static user(req, res, next) {
    next();
  }

  static app(req, res, next) {
    next();
  }

  static admin(req, res, next) {
    next();
  }
}
