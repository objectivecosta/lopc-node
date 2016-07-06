var MongoClient = require('mongodb').MongoClient;
var querystring = require("querystring");
module.exports = function () {
  var url = `mongodb://${querystring.escape(global.config.mongodb.username)}:${querystring.escape(global.config.mongodb.password)}@${global.config.mongodb.server}:${global.config.mongodb.port}/${global.config.mongodb.database}`;
  MongoClient.connect(url, function (err, db) {
    if (err) console.log('Error connecting to MongoDB: ' + err);
    else console.log('Connected to MongoDB over port ' + global.config.mongodb.port);
    console.log("");
    global.database = db;
  });
}
