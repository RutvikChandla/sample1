const redis = require('ioredis');
const http = require('http');
const config = {
  port: 6379,          // Redis port
  host: "localhost",   // Redis host
}

const client = new redis(config);

const server = http.createServer((req, res) => {
  console.log("Request received");
  // block event loop for 3 second
  const start = Date.now();
  while (Date.now() - start < 3000);
  res.end('Hello World');
});

server.listen(3004, () => {
  console.log('Server running on port 3000');
});

client.subscribe('channelr', (err, count) => {
  console.log('Subscribed to channel');
});

client.on('message', (channel, message) => {
  console.log('Received message in channel %s: %s', channel, message);
});