'use strict';
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const root = path.resolve(process.argv[2] || '.')
console.log('Static root dir: ' + root);

/**

[返回http]
@param {[type]} request [description]
@param {[type]} response [description]
@param {[type]} pathname [description]
@return {[type]} [description] */
const resolveHttpServer = (request, response, pathname) => {
  let filepath = path.join(root, pathname);
  fs.stat(filepath, (err, stats) => {
    if (!err && stats.isFile()) {
      console.log('200 ' + request.url);
      response.writeHead(200);
      fs.createReadStream(filepath).pipe(response);
    } else {
      console.log('404 ' + request.url);
      response.writeHead(404);
      response.end('404 Not Found');
    }
  })
}
let searchCount = 0;
let fileArr = ['/index.html', '/default.html', '/demo.html'];
/**

[依次递归查找fileArr中文件是否存在]
@param {[type]} request [description]
@param {[type]} response [description]
@return {[type]} [description] */
const searchFile = (request, response) => {
  if (!fileArr[searchCount]) return resolveHttpServer(request, response, '/');
  fs.readFile(fileArr[searchCount].substr(1), (err, data) => {
    if (err) {
      searchFile(request, response, ++searchCount);
    } else {
      resolveHttpServer(request, response, fileArr[searchCount]);
    }
  });
}
/**

[创建HTTP服务]
@param {[type]} (request, response [description]
@return {[type]} [description] */
const server = http.createServer((request, response) => {
  let pathname = url.parse(request.url).pathname;
  pathname = pathname && pathname != '/' ? resolveHttpServer(request, response, pathname) : searchFile(request, response);
})

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');