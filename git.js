"use strict";

var exec = require('child_process').exec;

class git {
  static getLastTag(callback) {
    exec('git describe', function(error, stdout, stderr) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, stdout);
      }
    });
  }
}

module.exports = git;
