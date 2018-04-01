const resolve = file => {
  let path = require('path').resolve(__dirname, file);
  console.log(`file: ${file}`);
  console.log(`path: ${path}`);
}

module.exports.resolve = resolve;