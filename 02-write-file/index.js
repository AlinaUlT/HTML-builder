const fs = require('fs');

const writer = fs.createWriteStream(__dirname + '/text.txt');

process.stdout.write('Enter some text \n');

process.on('SIGINT', () => {
  process.stdout.write('\nBye!\n');
  process.exit(0);
});

process.stdin.on('data', (data) => {
  if (data.toString() === 'exit\n') {
    process.stdout.write('Bye!\n');
    process.exit(0);
  }
  writer.write(data);
})

