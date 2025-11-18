import './LevelProgress.css'

function LevelProgress({ stats }) {
  const level = stats.level || 1
  const points = stats.points || 0
  const pointsForNextLevel = level * 100
  const progress = (points % pointsForNextLevel) / pointsForNextLevel * 100
  const streak = stats.streak || 0

  return (
    <div className="level-progress">
      <div className="level-info">
        <div className="level-badge">
          <span className="level-icon">⭐</span>
          <span className="level-number">Lv {level}</span>
        </div>
        <div className="streak-badge">
          <span className="streak-icon">🔥</span>
          <span className="streak-number">{streak}</span>
        </div>
        <div className="points-display">
          <span className="points-icon">💎</span>
          <span className="points-number">{points} pts</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}>
          <div className="progress-glow"></div>
        </div>
      </div>
      <div className="progress-text">
        {pointsForNextLevel - (points % pointsForNextLevel)} points to Level {level + 1}
      </div>
    </div>
  )
}

export default LevelProgress
