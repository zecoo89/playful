const asyncFs = require('./asyncFs')
const Vm = require('./vm')
const path = require('path')
const Logger = require('./logger')
const Context = require('./context')
const testFunctions = require('./testFunctions')

module.exports = class Unitest {
  constructor(config) {
    this.vm = new Vm()
    this.initConfig(config)
  }

  initConfig(config) {
    const defaultConfig = {
      testType: 'unitest',
      excludes: ['node_modules'],
    }

    if(config) {
      if(config.excludes) {
        config.excludes = config.excludes.map(dirname => path.resolve(dirname))
      }
      this.config = config ? config : defaultConfig
    }
  }

  async run(baseDir) {
    const filePathList = await this.searchFiles(baseDir)
    const status = {
      indent: 0,
      currentTestTurn: 0,
      numberOfSuccesses: 0,
      numberOfFails: 0,
    }

    for(let i = 0;i < filePathList.length;i++) {
      const file = filePathList[i]
      const context = new Context(testFunctions[this.config.testType], file)
      context.status = status
      await this.vm.run(context, file).catch((e) => Logger.runTimeError(e))
    }

    console.log(this.outputLog(status))
  }

  searchFiles(dir) {
    return this.recursivelySearch(dir)
  }

  async recursivelySearch(currentDir) {
    const options = {withFileTypes: true}
    const fileAndDirectory = await asyncFs.readdir(currentDir, options)
    const files = []
    const directories = []

    for(let f of fileAndDirectory) {
      const absolutePath = path.resolve(f.name)

      if(f.isDirectory() && !this.config.excludes.includes(absolutePath)) {
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
      const filesInDeepDir = await this.recursivelySearch(d)
      for(let f of filesInDeepDir) {
        files.push(f)
      }
    }

    return files
  }

  outputLog(status) {
    const numberOfSuccesses = status.numberOfSuccesses
    const numberOfFails = status.numberOfFails

    const total = numberOfSuccesses + numberOfFails
    const successParcentage =  Math.round(numberOfSuccesses / total * 100)
    const failParcentage = Math.round(numberOfFails / total * 100)

    const log = [
      '',
      '--- Summary ---'.yellow,
      'success: '.green + numberOfSuccesses + '/' + total + ` ${successParcentage} %`,
      'fail:    '.red + numberOfFails + '/' + total + ` ${failParcentage} %`]

    return log.join('\n')
  }
}
