const Logger = require('./logger')

function assert(context, result, expected) {
  if(result) {
    Logger.success(context.status.indent)
    context.status.numberOfSuccesses++
  } else {
    Logger.error(context, expected)
    context.status.numberOfFails++
  }
}

const unitest = {
  beforeEachTest: function(context, func) {
    context.beforeEachTestFunc = func
  },

  group: function(context, testGroupName, func) {
    Logger.printTestGroup(`${testGroupName}`)

    context.status.indent += 1
    func()
    context.status.indent -= 1
  },

  test: function(context, testName, func) {
    Logger.printTestName(`${testName}`, context.status.indent)

    try {
      if(context.beforeEachTestFunc) context.beforeEachTestFunc()
      func()
    } catch (e) {
      context.status.numberOfFails++
      Logger.runTimeError(e)
    }
  },

  check: function(context, received, expected) {
    assert(context, received === expected)
  },
}

const tdd = {
  describe: unitest.testGroup,

  beforeEachTest: unitest.beforeEachTest,
  test: unitest.test,

  expect: function(context, received) {
    context.receivedValue = received
    return context
  },

  toBe: function(context, expected) {
    assert(context, context.receivedValue === expected, expected)
  }
}

module.exports = {
  unitest,
  tdd,
}
