var MongoClient = require('mongodb').MongoClient;
global.mongoose = require('mongoose');
var querystring = require("querystring");
module.exports = function () {
  var url = `mongodb://${querystring.escape(global.config.mongodb.username)}:${querystring.escape(global.config.mongodb.password)}@${global.config.mongodb.server}:${global.config.mongodb.port}/${global.config.mongodb.database}`;
  global.mongoose.connect(url);

  var db = global.mongoose.connection;
  db.on('error', function() {
    console.log('Error connecting to MongoDB');
  });
  db.once('open', function() {
    console.log('Connected to MongoDB over port ' + global.config.mongodb.port);
  });
}
