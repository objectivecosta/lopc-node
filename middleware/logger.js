'use strict';

class Logger {
  static inject(req, res, next) {
    console.log(`[${req.method}] ${req.path} from ${req.ip} via ${req.protocol.toUpperCase()} at ${(new Date).toISOString()}`);
    next();
  }
}

module.exports = Logger;
