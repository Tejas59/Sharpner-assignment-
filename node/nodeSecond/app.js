const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to my Node.js project');
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
