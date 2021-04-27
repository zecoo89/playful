require('colors')

function makeBlanks(indent) {
  let blanks = ''

  for(let i = 0;i<indent;i++) {
    blanks += ' '
  }

  return blanks
}

module.exports = {
  success() {
    console.log(`  ✓ success`.green)
  },

  error(context, expected) {
    const received = context.received
    console.error('✗ error:'.red)
    console.error('received: \n'.red, received)
    console.error('expected: \n'.green, expected)
  },

  runTimeError(e) {
    console.error('RunTimeError:'.red)
    console.error(e)
  },

  log(content, indent) {
    const blanks = makeBlanks(indent)
    console.log(`${blanks}${content}`)
  },

  printTestGroup(testGroupName, indent) {
    const blanks = makeBlanks(indent)
    process.stdout.write(`${blanks}+-+ ${testGroupName}\n`)
  },

  printTestName(testName, indent) {
    const blanks = makeBlanks(indent)
    process.stdout.write(`${blanks} +-- ${testName}`)
  }
}
