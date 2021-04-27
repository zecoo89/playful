const fs = require('fs')


module.exports = class Watcher {
  constructor() {
    this.isLocked = false
    this.excludes = ['.git', './node_modules']
  }

  watch(watchDir, runTestFn) {
    fs.watch(watchDir, {recursive: true}, (eventType,filename) => {
      const firstPath = filename.split('/')[0]

      if(!this.isLocked && !this.excludes.includes(firstPath)) {
        this.isLocked = true
        console.log('------ ', eventType, filename, ' ------')
        runTestFn(watchDir)
        this.isLocked = false
      }
    })
  }
}

