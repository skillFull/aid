
const WebSocket = require('ws');

 
const server = new WebSocket.Server({port: 8000, clientTracking: true});
 
server.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    console.log(server.clients.size)
  });
 
  ws.send('something');
});