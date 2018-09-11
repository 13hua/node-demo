'use strict';

//a simple http server that always display 'Hello, world!'

const http = require('http');

let server = http.createServer(function (request, response) {
  console.log(request.method + ': ' + request.url);
  response.writeHead(200, {
    'Content_Type': 'text/html'
  });
  response.end('<h1>Hello world!</h1>');
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080');