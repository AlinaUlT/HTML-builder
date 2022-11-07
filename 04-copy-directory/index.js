const fs = require('fs');
const src = 'files';
const dest = 'files-copy';

fs.mkdir(__dirname +'/' +dest, {recursive: true}, (err, data)=>{
  if (err) {
  console.log("err" + '/' + err);
  }
});
fs.readdir(__dirname + '/'+ src, {withFileTypes: true},
  async (err, files) => {
    console.log(files);
  for (let file of files) {
    if (file.isFile()) 
      console.log(`${file.name}`);
      fs.copyFile(`${__dirname}/${src}/${file.name}`,`${__dirname}/${dest}/${file.name}`, (err,data)=> {
        if (err) {
        console.log(" " + err);
        }
      })
  }
});

