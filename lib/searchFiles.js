const asyncFs = require('./asyncFs')
const path = require('path')

function searchFiles(dir, config) {
  return recursivelySearch(dir, config)
}

async function recursivelySearch(currentDir, config) {
  const options = {withFileTypes: true}
  const fileAndDirectory = await asyncFs.readdir(currentDir, options)
  const files = []
  const directories = []

  for(let f of fileAndDirectory) {
    const absolutePath = path.resolve(f.name)

    if(f.isDirectory() && !config.excludes.includes(absolutePath)) {
      const newPath = path.join(currentDir, f.name)
      directories.push(newPath)
    } else {
      const extensions = f.name.split('.')
      if(extensions[1] === 'test') {
        const filePath = path.join(currentDir,f.name)
        files.push(filePath)
      }
    }
  }

  for(let d of directories) {
    const filesInDeepDir = await recursivelySearch(d, config)
    for(let f of filesInDeepDir) {
      files.push(f)
    }
  }

  return files
}

module.exports = searchFiles

