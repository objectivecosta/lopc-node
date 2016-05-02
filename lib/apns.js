"use strict";

var https = require('https');
var fs = require("fs");

class APNS {
  send() {
    var options = {
      host: 'gateway.sandbox.push.apple.com',
      port: 8000,
      path: '/test',
      method: 'GET',
      cert: fs.readFileSync("cert/push.pem")
};

var req = https.request(options, function(res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);

	res.on('data', function(d) {
    	process.stdout.write(d);
  	});
});

req.end();
  }
}

module.exports = APNS;
