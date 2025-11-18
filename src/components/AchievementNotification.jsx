import { useEffect, useState } from 'react'
import { playSound } from '../utils/sounds'
import './AchievementNotification.css'

function AchievementNotification({ achievement }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      playSound('achievement')
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [achievement])

  if (!visible || !achievement) return null

  return (
    <div className="achievement-notification">
      <div className="achievement-content">
        <div className="achievement-icon">{achievement.icon}</div>
        <div className="achievement-details">
          <div className="achievement-title">Achievement Unlocked! 🎉</div>
          <div className="achievement-name">{achievement.name}</div>
          <div className="achievement-description">{achievement.description}</div>
          <div className="achievement-reward">+{achievement.points} points</div>
        </div>
      </div>
    </div>
  )
}

export default AchievementNotification
