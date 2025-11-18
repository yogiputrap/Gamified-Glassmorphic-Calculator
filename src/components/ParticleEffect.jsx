import { useEffect, useState } from 'react'
import './ParticleEffect.css'

function ParticleEffect({ x, y }) {
  const [particles] = useState(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (360 / 12) * i,
      delay: i * 0.05
    }))
  })

  return (
    <div className="particle-container" style={{ left: x, top: y }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            '--angle': `${particle.angle}deg`,
            '--delay': `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

export default ParticleEffect
