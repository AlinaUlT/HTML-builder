const fs = require('fs');
const readline = require('readline')

function handleError(err) {
  if (err) {
    throw err;
  }
}
async function processHtmlTempate() {
  fs.mkdir(__dirname + '/project-dist', { recursive: true }, handleError);

  const rl = readline.createInterface({
    input: fs.createReadStream(__dirname + '/template.html'),
    crlfDelay: Infinity,
  })

  const writer = fs.createWriteStream(__dirname + '/project-dist/index.html');
  for await (const line of rl) {
    const trimLine = line.trim();
    if (trimLine.startsWith('{{') && trimLine.endsWith('}}')) {
      const fileName = trimLine.substring(2, trimLine.length - 2) + '.html';
      const fileContent = await fs.promises.readFile(__dirname + '/components/' + fileName);
      writer.write(fileContent.toString() + '\n');
    } else {
      writer.write(line + '\n');
    }
  }
}

async function createBundle(src = "styles", dest = "project-dist") {
  fs.writeFile(`${__dirname}/${dest}/style.css`, '', handleError)

  const files = await fs.promises.readdir(__dirname + '/' + src, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile() && file.name.endsWith(".css")) {
      fs.readFile(`${__dirname}/${src}/${file.name}`, (err, data) => {
        handleError(err)
        fs.appendFile(`${__dirname}/${dest}/style.css`, data.toString(), handleError);
      });
    };
  }
}

async function copyAssets(src = "assets", dest = "project-dist/assets") {
  fs.mkdir(__dirname + '/' + dest, { recursive: true }, handleError);

  const files = await fs.promises.readdir(__dirname + '/' + src, { withFileTypes: true });

  if (files) {
    for (let file of files) {
      if (file.isDirectory()) {
        copyAssets(`${src}/${file.name}`, `${dest}/${file.name}`);
      } else {
        fs.copyFile(`${__dirname}/${src}/${file.name}`, `${__dirname}/${dest}/${file.name}`, handleError);
      }
    }
  }
}

processHtmlTempate();
createBundle();
copyAssets();
