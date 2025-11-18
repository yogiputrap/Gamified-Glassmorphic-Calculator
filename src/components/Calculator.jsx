import { useState, useEffect } from 'react'
import Display from './Display'
import Button from './Button'
import History from './History'
import LevelProgress from './LevelProgress'
import ParticleEffect from './ParticleEffect'
import { playSound } from '../utils/sounds'
import { evaluate } from '../utils/calculator'
import './Calculator.css'

function Calculator({ onCalculation, stats }) {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const addParticle = (x, y) => {
    const id = Date.now()
    setParticles(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id))
    }, 1000)
  }

  const handleNumberClick = (num) => {
    playSound('click')
    
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimalClick = () => {
    playSound('click')
    
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleOperationClick = (nextOperation) => {
    playSound('operation')
    const inputValue = parseFloat(display)

    if (previousValue == null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = evaluate(currentValue, inputValue, operation)
      
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const handleEqualsClick = (e) => {
    playSound('equals')
    const inputValue = parseFloat(display)

    if (previousValue != null && operation) {
      const newValue = evaluate(previousValue, inputValue, operation)
      const calculation = `${previousValue} ${operation} ${inputValue} = ${newValue}`
      
      const newHistory = [
        { 
          id: Date.now(), 
          expression: calculation, 
          result: newValue,
          timestamp: new Date().toLocaleTimeString()
        },
        ...history.slice(0, 9)
      ]
      
      setHistory(newHistory)
      localStorage.setItem('calculatorHistory', JSON.stringify(newHistory))
      
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
      
      onCalculation(operation, newValue)

      if (e && e.clientX && e.clientY) {
        addParticle(e.clientX, e.clientY)
      }
    }
  }

  const handleClearClick = () => {
    playSound('clear')
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handlePercentClick = () => {
    playSound('operation')
    const value = parseFloat(display)
    setDisplay(String(value / 100))
    setWaitingForOperand(true)
  }

  const handleBackspaceClick = () => {
    playSound('click')
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleSignClick = () => {
    playSound('click')
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  return (
    <div className="calculator-wrapper">
      {particles.map(particle => (
        <ParticleEffect key={particle.id} x={particle.x} y={particle.y} />
      ))}
      
      <LevelProgress stats={stats} />
      
      <div className="calculator">
        <Display value={display} operation={operation} />
        
        <div className="calculator-buttons">
          <Button value="C" onClick={handleClearClick} variant="function" />
          <Button value="±" onClick={handleSignClick} variant="function" />
          <Button value="%" onClick={handlePercentClick} variant="function" />
          <Button value="÷" onClick={() => handleOperationClick('÷')} variant="operator" />

          <Button value="7" onClick={() => handleNumberClick(7)} />
          <Button value="8" onClick={() => handleNumberClick(8)} />
          <Button value="9" onClick={() => handleNumberClick(9)} />
          <Button value="×" onClick={() => handleOperationClick('×')} variant="operator" />

          <Button value="4" onClick={() => handleNumberClick(4)} />
          <Button value="5" onClick={() => handleNumberClick(5)} />
          <Button value="6" onClick={() => handleNumberClick(6)} />
          <Button value="−" onClick={() => handleOperationClick('−')} variant="operator" />

          <Button value="1" onClick={() => handleNumberClick(1)} />
          <Button value="2" onClick={() => handleNumberClick(2)} />
          <Button value="3" onClick={() => handleNumberClick(3)} />
          <Button value="+" onClick={() => handleOperationClick('+')} variant="operator" />

          <Button value="⌫" onClick={handleBackspaceClick} variant="function" />
          <Button value="0" onClick={() => handleNumberClick(0)} />
          <Button value="." onClick={handleDecimalClick} />
          <Button value="=" onClick={handleEqualsClick} variant="equals" />
        </div>
      </div>

      <History history={history} onClear={() => {
        setHistory([])
        localStorage.removeItem('calculatorHistory')
        playSound('clear')
      }} />
    </div>
  )
}

export default Calculator
