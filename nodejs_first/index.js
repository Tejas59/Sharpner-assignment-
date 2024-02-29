const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Tejas Vinod Vaidya');
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
