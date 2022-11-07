const fs = require('fs');

const reader = fs.createReadStream(__dirname + '/text.txt', {encoding: 'utf-8'});

reader.on('data', (data) => {
  process.stdout.write(data.toString())
})
