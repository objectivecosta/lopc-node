"use strict";

var Authenticator = require('./authenticator');
var sockets = {};

class Websocket {

  static start() {
    var WebSocketServer = require('ws').Server
      , wss = new WebSocketServer({ port: 2999 });

    wss.on('connection', function connection(ws) {
      ws.on('message', function (message) {
        var json = JSON.parse(message);
        if (json.msgType == 'rgst') {
          _validate(json, ws, function () {
            sockets[json.deviceToken] = ws;
          });
        } else if json.msgType == 'drgst' {
          _validate(json, ws, function () {
            delete sockets[json.deviceToken];
            ws.close(0, null);
          });
        } else {
          ws.close(0, null);
        }
      });
    });
  }

  static connectedSockets() {
    return sockets;
  }
}

function _validate(json, ws, callback) {
  Authenticator.isValidApp(json.appId, json.appSecret, function (err, valid) {
    if (valid == false) {
      ws.close(0, null);
      return;
    } else {
      Authenticator.isValidUser(json.deviceToken, json.appId, function (err, valid) {
        if (valid == false) {
          ws.close(0, null);
          return;
        } else {
          callback();
        }
      });
    }
  });
}

module.exports = Websocket;
