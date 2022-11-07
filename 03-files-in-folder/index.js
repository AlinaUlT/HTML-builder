const fs = require('fs');

//https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fs_fspromises_readdir_path_options)
function listFiles() {
  fs.readdir(__dirname + '/secret-folder', { withFileTypes: true }, async (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file.isFile()) {
        let spl = file.name.split('.');
        let name = spl[0];
        let ext = spl[1];
        let stat = await fs.promises.stat(`${__dirname}/secret-folder/${file.name}`);
        console.log(`${name} - ${ext} - ${stat.size / 1024}kb`);
      }
    }
  });
}
listFiles();
