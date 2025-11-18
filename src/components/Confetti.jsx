import { useEffect, useState } from 'react'
import './Confetti.css'

function Confetti() {
  const [confettiPieces] = useState(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      color: ['#667eea', '#764ba2', '#f093fb', '#ffd700', '#ff6b6b'][Math.floor(Math.random() * 5)]
    }))
  })

  return (
    <div className="confetti-container">
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
