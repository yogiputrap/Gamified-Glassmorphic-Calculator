import { useState, useEffect } from 'react'

const INITIAL_STATS = {
  level: 1,
  points: 0,
  totalCalculations: 0,
  streak: 0,
  maxStreak: 0,
  additions: 0,
  subtractions: 0,
  multiplications: 0,
  divisions: 0,
  lastCalculationTime: null
}

export function useGameStats() {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('gameStats')
    return saved ? JSON.parse(saved) : INITIAL_STATS
  })

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(stats))
  }, [stats])

  const updateStats = (operation, result) => {
    setStats(prevStats => {
      const now = Date.now()
      const lastTime = prevStats.lastCalculationTime
      const timeDiff = lastTime ? now - lastTime : Infinity
      
      const isStreakContinued = timeDiff < 10000
      const newStreak = isStreakContinued ? prevStats.streak + 1 : 1
      
      let pointsEarned = 10
      if (newStreak > 5) pointsEarned += 5
      if (newStreak > 10) pointsEarned += 10
      if (Math.abs(result) > 1000) pointsEarned += 5
      
      const newPoints = prevStats.points + pointsEarned
      const newLevel = Math.floor(newPoints / 100) + 1
      
      const operationKey = {
        '+': 'additions',
        '−': 'subtractions',
        '×': 'multiplications',
        '÷': 'divisions'
      }[operation] || 'additions'

      return {
        ...prevStats,
        level: newLevel,
        points: newPoints,
        totalCalculations: prevStats.totalCalculations + 1,
        streak: newStreak,
        maxStreak: Math.max(prevStats.maxStreak, newStreak),
        [operationKey]: prevStats[operationKey] + 1,
        lastCalculationTime: now
      }
    })
  }

  return { stats, updateStats }
}
