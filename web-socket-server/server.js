var http = require('http')
var express = require('express')
var WebSocket = require('ws')
var ShareDB = require('sharedb')
var WebSocketJSONStream = require('@teamwork/websocket-json-stream')

console.log("load wss")

var app = express()
var server = http.createServer(app)
var webSocketServer = new WebSocket.Server({server: server})

console.log("connect wss")

ShareDB.types.register(require('rich-text').type);
var backend = new ShareDB()
webSocketServer.on('connection', (webSocket) => {
  var stream = new WebSocketJSONStream(webSocket)
  backend.listen(stream)
})

console.log("listen server 9000")

server.listen(9000)