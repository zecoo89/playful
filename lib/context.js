const path = require('path')

module.exports = class Context {
  constructor(testFunctions, filePath, status) {
    this.initTestFunctions(testFunctions)
    this.redefineRequireFunction(filePath)
    this.status = status
  }

  initTestFunctions(functions) {
    Object.keys(functions).forEach(key => {
      this[key] = functions[key].bind(null, this)
    })

    this['console'] = console
  }

  redefineRequireFunction(filePath) {
    const dirname = path.dirname(filePath)
    this.require = (requireFile) => {
      const relativePath = path.join(dirname, requireFile)
      const absolutePath = path.resolve(relativePath)

      return require(absolutePath)
    }
  }
}
