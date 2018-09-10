'use strict';

//read text from 'sample.txt'

const fs = require('fs');

console.log('>>> BEGIN >>>')

let data = 'Hello , Node.js';

fs.writeFile('output.txt', data);

console.log('>>> END >>>');