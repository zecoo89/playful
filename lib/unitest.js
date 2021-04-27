const Vm = require('./vm')
const Logger = require('./logger')
const Context = require('./context')
const testFunctions = require('./testFunctions')
const searchFiles = require('./searchFiles')

module.exports = class Unitest {
  constructor(config) {
    this.vm = new Vm()
    this.config = config
  }

  async run(baseDir) {
    const filePathList = await searchFiles(baseDir, this.config)
    const status = {
      indent: 0,
      currentTestTurn: 0,
      numberOfSuccesses: 0,
      numberOfFails: 0,
    }

    for(let filePath of filePathList) {
      const context = new Context(testFunctions[this.config.testType], filePath, status)
      await this.vm.run(context, filePath).catch((e) => Logger.runTimeError(e))
    }

    Logger.outputLog(status)
  }
}
