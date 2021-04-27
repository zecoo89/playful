const asyncFs = require('../lib/asyncFs')
const path = require('path')

const defaultConfig = {
  testType: 'unitest',
  excludes: ['./node_modules']
}

module.exports = async function createConfig() {
  const configText = await asyncFs.readFile('./.unitest.json', 'utf8')
  const config = JSON.parse(configText)

  let c = defaultConfig
  if(config) {
    if(config.testType) {
      c.testType = config.testType
    }
    if(config.excludes) {
      c.excludes = config.excludes
    }
    c.excludes = config.excludes.map(dirname => path.resolve(dirname))
  }

  return c
}
