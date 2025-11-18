import './Button.css'

function Button({ value, onClick, variant = 'default' }) {
  const handleClick = (e) => {
    const button = e.currentTarget
    button.classList.add('button-pressed')
    setTimeout(() => button.classList.remove('button-pressed'), 100)
    
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={`calculator-button ${variant}`}
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

export default Button
