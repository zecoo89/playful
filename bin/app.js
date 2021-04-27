#! /usr/bin/env node

const creatConfig = require('../lib/createConfig')
const Unitest = require('../lib/unitest')
const Watcher = require('../lib/watcher')

const run = async (path) => {
  const config = await creatConfig()
  const unitest = new Unitest(config)
  unitest.run(path)
}

const watch = (watchDir) => {
  const watcher = new Watcher()
  watcher.watch(watchDir, run)
}

const main = () => {
  const args = process.argv

  let path = './'
  let isWatch = false
  for(let i=0;i<args.length-1;i++) {
    if(args[i] === '-d') {
      path = args[i+1]
    }

    if(args[i] === '-w') {
      isWatch = true
    }
  }

  if(isWatch) {
    watch(path)
  } else {
    run(path)
  }

}


main()
