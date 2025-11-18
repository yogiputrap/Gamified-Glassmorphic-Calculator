import { useState, useEffect } from 'react'

const ACHIEVEMENTS = {
  firstCalculation: {
    name: 'Getting Started',
    description: 'Perform your first calculation',
    icon: '🎯',
    points: 25,
    check: (stats) => stats.totalCalculations >= 1
  },
  quickCalculator: {
    name: 'Quick Calculator',
    description: 'Complete 10 calculations',
    icon: '⚡',
    points: 50,
    check: (stats) => stats.totalCalculations >= 10
  },
  mathMaster: {
    name: 'Math Master',
    description: 'Complete 50 calculations',
    icon: '🧠',
    points: 100,
    check: (stats) => stats.totalCalculations >= 50
  },
  centuryClub: {
    name: 'Century Club',
    description: 'Complete 100 calculations',
    icon: '💯',
    points: 200,
    check: (stats) => stats.totalCalculations >= 100
  },
  speedDemon: {
    name: 'Speed Demon',
    description: 'Reach a 5 calculation streak',
    icon: '🔥',
    points: 75,
    check: (stats) => stats.streak >= 5
  },
  onFire: {
    name: 'On Fire!',
    description: 'Reach a 10 calculation streak',
    icon: '🚀',
    points: 150,
    check: (stats) => stats.streak >= 10
  },
  unstoppable: {
    name: 'Unstoppable',
    description: 'Reach a 20 calculation streak',
    icon: '⚡',
    points: 250,
    check: (stats) => stats.maxStreak >= 20
  },
  levelUp: {
    name: 'Level Up!',
    description: 'Reach Level 5',
    icon: '⭐',
    points: 100,
    check: (stats) => stats.level >= 5
  },
  veteran: {
    name: 'Veteran',
    description: 'Reach Level 10',
    icon: '🏆',
    points: 200,
    check: (stats) => stats.level >= 10
  },
  additionExpert: {
    name: 'Addition Expert',
    description: 'Perform 25 additions',
    icon: '➕',
    points: 50,
    check: (stats) => stats.additions >= 25
  },
  multiplicationMaster: {
    name: 'Multiplication Master',
    description: 'Perform 25 multiplications',
    icon: '✖️',
    points: 50,
    check: (stats) => stats.multiplications >= 25
  },
  allRounder: {
    name: 'All-Rounder',
    description: 'Perform 10 of each operation',
    icon: '🎓',
    points: 150,
    check: (stats) => 
      stats.additions >= 10 && 
      stats.subtractions >= 10 && 
      stats.multiplications >= 10 && 
      stats.divisions >= 10
  }
}

export function useAchievements(stats) {
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements')
    if (saved) {
      return JSON.parse(saved)
    }
    
    const initial = {}
    Object.keys(ACHIEVEMENTS).forEach(key => {
      initial[key] = { ...ACHIEVEMENTS[key], unlocked: false }
    })
    return initial
  })

  const [newAchievement, setNewAchievement] = useState(null)

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }, [achievements])

  const checkAchievements = () => {
    let foundNew = false
    const updated = { ...achievements }

    Object.keys(ACHIEVEMENTS).forEach(key => {
      if (!updated[key].unlocked && ACHIEVEMENTS[key].check(stats)) {
        updated[key].unlocked = true
        setNewAchievement(updated[key])
        foundNew = true
      }
    })

    if (foundNew) {
      setAchievements(updated)
      setTimeout(() => setNewAchievement(null), 5000)
    }
  }

  return { achievements, checkAchievements, newAchievement }
}
