var https = require("https");
var express = require("express");
var WebSocket = require("ws");
var ShareDB = require("sharedb");
var WebSocketJSONStream = require("@teamwork/websocket-json-stream");
var fs = require("fs");

console.log("load wss");

var app = express();

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/i6d201.p.ssafy.io/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/i6d201.p.ssafy.io/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/i6d201.p.ssafy.io/cert.pem"),
};
var server = https.createServer(options, app);
var webSocketServer = new WebSocket.Server({ server: server });

console.log("connect wss");

ShareDB.types.register(require("rich-text").type);
var backend = new ShareDB();
webSocketServer.on("connection", (webSocket) => {
  var stream = new WebSocketJSONStream(webSocket);
  backend.listen(stream);
});

console.log("listen server 9000");

server.listen(9000);
