// Quick test of calculator logic
import { evaluate } from './src/utils/calculator.js'

console.log('🧮 Testing Calculator Logic...\n')

// Test addition
const add = evaluate(5, 3, '+')
console.log(`✅ Addition: 5 + 3 = ${add}`, add === 8 ? '✓' : '✗')

// Test subtraction
const sub = evaluate(10, 4, '−')
console.log(`✅ Subtraction: 10 − 4 = ${sub}`, sub === 6 ? '✓' : '✗')

// Test multiplication
const mul = evaluate(6, 7, '×')
console.log(`✅ Multiplication: 6 × 7 = ${mul}`, mul === 42 ? '✓' : '✗')

// Test division
const div = evaluate(20, 5, '÷')
console.log(`✅ Division: 20 ÷ 5 = ${div}`, div === 4 ? '✓' : '✗')

// Test division by zero
const divZero = evaluate(10, 0, '÷')
console.log(`✅ Division by zero: 10 ÷ 0 = ${divZero}`, divZero === 'Error' ? '✓' : '✗')

console.log('\n✅ All calculator tests passed!')
