'use strict';

class Logger {
  static inject(req, res, next) {
    console.log(`[${req.method}] ${req.path} from ${req.ip} via ${req.protocol.toUpperCase()}`);
    next();
  }
}

module.exports = Logger;
