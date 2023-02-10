const add = (num1: number, num2: number) => {
  return num1 + num2
}

describe ('Simple example unit test', () => {
  it ('Checks 2 plus 2 is 4', () => {
    const expected = 4

    const result = add(2, 2)

    expect(result).toBe(expected)
  })
})