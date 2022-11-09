const fs = require('fs');
const src = 'files';
const dest = 'files-copy';

async function copyDirectory() {

  await fs.promises.mkdir(__dirname + '/' + dest, { recursive: true });
  fs.readdir(__dirname + '/' + src, { withFileTypes: true },
    async (err, files) => {
      await fs.promises.rm(__dirname + '/' + dest, { recursive: true });
      await fs.promises.mkdir(__dirname + '/' + dest, { recursive: true }, async (err, data) => {
        if (err) {
          console.log("the directory already exists, it will be overwritten");
        }
      });

      console.log(files);
      for (let file of files) {
        if (file.isFile())
          console.log(`${file.name}`);
        fs.copyFile(`${__dirname}/${src}/${file.name}`, `${__dirname}/${dest}/${file.name}`, (err, data) => {
          if (err) {
            console.log(err);
          }
        })
      }
    });
}
copyDirectory()
