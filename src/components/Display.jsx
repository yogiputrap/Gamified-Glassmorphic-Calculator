import './Display.css'

function Display({ value, operation }) {
  const formatDisplay = (val) => {
    if (val.length > 12) {
      const num = parseFloat(val)
      if (num > 999999999999) {
        return num.toExponential(6)
      }
      return num.toFixed(8).replace(/\.?0+$/, '')
    }
    return val
  }

  return (
    <div className="display">
      {operation && <div className="operation-indicator">{operation}</div>}
      <div className="display-value">{formatDisplay(value)}</div>
    </div>
  )
}

export default Display
