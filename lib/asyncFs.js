const fs = require('fs')
const promisify = require('util').promisify

module.exports = {
  readdir: promisify(fs.readdir),
  readFile: promisify(fs.readFile),
}
