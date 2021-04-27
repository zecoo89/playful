#! /usr/bin/env node

const creatConfig = require('../lib/createConfig')
const Unitest = require('../lib/unitest')

const main = async () => {
  const config = await creatConfig()
  const unitest = new Unitest(config)
  unitest.run('./')
}

main()
