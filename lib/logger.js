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
    console.log(` ✓`.green)
  },

  error(context, expected) {
    const received = context.receivedValue
    console.error(' ✗'.red)
    console.error('received:'.red, received)
    console.error('expected:'.green, expected)
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
  },

  outputSummary(status) {
    const numberOfSuccesses = status.numberOfSuccesses
    const numberOfFails = status.numberOfFails

    const total = numberOfSuccesses + numberOfFails
    const successParcentage =  Math.round(numberOfSuccesses / total * 100)
    const failParcentage = Math.round(numberOfFails / total * 100)

    const log = [
      '',
      '--- Summary ---'.yellow,
      'success: '.green + numberOfSuccesses + '/' + total + ` ${successParcentage} %`,
      'fail:    '.red + numberOfFails + '/' + total + ` ${failParcentage} %`,
      ''
    ]

    const text = log.join('\n')

    console.log(text)
  }
}
