describe('testGroupName', () => {
  test('testName', function() {
    const received = 100
    const expected = 100
    expect(received).toBe(expected)
  })

  test('Fail test', function() {
    const received = 100
    const expected = 20
    expect(received).toBe(expected)
  })
})
