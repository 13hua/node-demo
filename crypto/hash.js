'use strict';

//

const crypto = require('crypto');

const hash = crypto.createHash('md5');

hash.update('Hello, world');
hash.update('Hello, nodejs!');

console.log(hash);

let r = hash.digest('hex');
console.log(`md5 hash: ${r}`);