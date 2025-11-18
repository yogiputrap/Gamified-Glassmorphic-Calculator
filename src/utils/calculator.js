export function evaluate(firstValue, secondValue, operation) {
  const a = parseFloat(firstValue)
  const b = parseFloat(secondValue)

  switch (operation) {
    case '+':
      return a + b
    case '−':
      return a - b
    case '×':
      return a * b
    case '÷':
      if (b === 0) {
        return 'Error'
      }
      return a / b
    default:
      return secondValue
  }
}
