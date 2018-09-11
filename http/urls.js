'use strict';

var url = require('url');

// parse url:
console.log('parse url:', url.parse('http://user:parse@host.com:8080/path/to/file?query=string#hash'));

//parse incomplete url:
console.log('parse incomplete url:', url.parse('/static/js/jquery.js?name=Hello%20world'));

// construct a url:

console.log('construct a url:', url.format({
  protocol: 'http',
  hostname: 'localhost',
  pathname: '/static/js',
  query: {
    name: 'Nodejs',
    version: 'v 1.0'
  }
}));