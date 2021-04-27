#! /usr/bin/env node

const Unitest = require('../lib/unitest')
const asyncFs = require('../lib/asyncFs')

const main = async () => {
  const configString = await asyncFs.readFile('./.unitest.json', 'utf8')
  const config = JSON.parse(configString)
  const unitest = new Unitest(config)
  unitest.run('./')
}

main()
