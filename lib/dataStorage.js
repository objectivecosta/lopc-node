"use strict";
var fs = require('fs');
class DataStorage {
  static get(filename, callback) {
    if (filename.indexOf('_') == 0) {
      callback(new Error('Invalid filename'), null);
    } else {
      fs.readFile('../data/' + filename + '.json', function (err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, JSON.parse(data));
        }
      });
    }
  }

  static save(filename, content, callback) {
    if (filename.indexOf('_') == 0) {
      callback(new Error('Invalid filename'), null);
    } else {
      fs.writeFile('../data/' + filename + '.json', JSON.stringify(content), function(err) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, content);
          }
      });
    }
  }
}

module.exports = DataStorage;
