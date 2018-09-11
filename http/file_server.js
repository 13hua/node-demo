'use strict';

// a simple http server

const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

// 从命令行参数获取root目录，默认是当前目录:
let root = path.resolve(process.argv[2] || '.');

console.log('Static root dir:' + root);

// 创建服务器:
let server = http.createServer(function (request, response) {
  // 获得URL的path，类似 '/css/bootstrap.css':
  let pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  let filepath = path.join(root, pathname);

  console.log('pathname=', pathname);
  console.log('filepath=', filepath);
  // 获取文件状态:
  fs.stat(filepath, function (err, stats) {
    if (!err && stats.isFile()) {
      // 没有出错并且文件存在:
      console.log('200 ' + request.url);
      // 发送200响应:
      response.writeHead(200);
      // 将文件流导向response:
      fs.createReadStream(filepath).pipe(response);
    } else if (!err && stats.isDirectory()) { // 这里需要写一个递归查询文件
      fs.readdir(filepath, 'utf8', function (err, files) {
        console.log(files);
        if (err) {
          console.log(err);
        } else {
          for (let file of files) {
            if (file == 'index.html' || file == 'default.html') {
              console.log('200: ' + request.url);
              response.writeHead(200);
              fs.createReadStream(path.join(filepath, file)).pipe(response);
            }
          }
        }
      });
    } else {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    }
  });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');