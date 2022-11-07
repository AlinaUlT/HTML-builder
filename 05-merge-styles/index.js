const fs = require('fs');
const src = 'styles';
const dest = 'project-dist';

function getStyles() {
  fs.writeFile(`${__dirname}/${dest}/bundle.css`, '', (err, data) => {
    if (err) throw err;
  })
  fs.readdir(__dirname + '/' + src, { withFileTypes: true },
    (err, files) => {
      if (err)
        throw err;
      for (let file of files) {
        if (file.isFile() && file.name.endsWith(".css")) {
          fs.readFile(`${__dirname}/${src}/${file.name}`, (err, data) => {
            if (err)
              throw err;
            fs.appendFile(`${__dirname}/${dest}/bundle.css`, data.toString(), (err, data) => {
              if (err) console.log(err);
            });
          });
        };
      }
    }
  );
}
getStyles()
