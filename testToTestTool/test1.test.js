group('testGroupName', () => {
  test('testName', function() {
    const received = 100
    const expected = 100

    check(received, expected)
  })

  test('Fail test', function() {
    const received = 100
    const expected = 20

    check(received, expected)
  })
})
