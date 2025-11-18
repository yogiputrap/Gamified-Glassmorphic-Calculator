import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'
import StatsPanel from './components/StatsPanel'
import AchievementNotification from './components/AchievementNotification'
import Confetti from './components/Confetti'
import { useGameStats } from './hooks/useGameStats'
import { useAchievements } from './hooks/useAchievements'
import './App.css'

function App() {
  const [showStats, setShowStats] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const { stats, updateStats } = useGameStats()
  const { achievements, checkAchievements, newAchievement } = useAchievements(stats)

  useEffect(() => {
    if (newAchievement) {
      setConfettiActive(true)
      setTimeout(() => setConfettiActive(false), 3000)
    }
  }, [newAchievement])

  const handleCalculation = (operation, result) => {
    updateStats(operation, result)
    checkAchievements()
  }

  return (
    <div className="app">
      {confettiActive && <Confetti />}
      <div className="app-container">
        <div className="header">
          <h1 className="app-title">
            <span className="title-icon">🎮</span>
            Gamified Calculator
            <span className="title-icon">✨</span>
          </h1>
          <button 
            className="stats-toggle"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? '🧮 Calculator' : '📊 Stats'}
          </button>
        </div>

        {showStats ? (
          <StatsPanel stats={stats} achievements={achievements} />
        ) : (
          <Calculator onCalculation={handleCalculation} stats={stats} />
        )}

        {newAchievement && (
          <AchievementNotification achievement={newAchievement} />
        )}
      </div>
    </div>
  )
}

export default App
