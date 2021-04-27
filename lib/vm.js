const vm = require('vm')
const asyncFs = require('./asyncFs')

module.exports = class Vm {
  constructor() {
    this.vm = vm
  }

  async run(context, filePath) {
    console.log(`In ${filePath}\n`.yellow)
    this.vm.createContext(context)
    const code = await asyncFs.readFile(filePath)
    this.vm.runInContext(code, context)
  }
}
