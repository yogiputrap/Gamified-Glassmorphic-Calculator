import './StatsPanel.css'

function StatsPanel({ stats, achievements }) {
  const totalAchievements = Object.keys(achievements).length
  const unlockedAchievements = Object.values(achievements).filter(a => a.unlocked).length

  return (
    <div className="stats-panel">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🧮</div>
          <div className="stat-value">{stats.totalCalculations || 0}</div>
          <div className="stat-label">Total Calculations</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.level || 1}</div>
          <div className="stat-label">Level</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-value">{stats.points || 0}</div>
          <div className="stat-label">Total Points</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{stats.streak || 0}</div>
          <div className="stat-label">Current Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{stats.maxStreak || 0}</div>
          <div className="stat-label">Best Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{unlockedAchievements}/{totalAchievements}</div>
          <div className="stat-label">Achievements</div>
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">🏅 Achievements</h2>
        <div className="achievements-grid">
          {Object.entries(achievements).map(([key, achievement]) => (
            <div 
              key={key} 
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-card-icon">{achievement.icon}</div>
              <div className="achievement-card-name">{achievement.name}</div>
              <div className="achievement-card-desc">{achievement.description}</div>
              {achievement.unlocked && (
                <div className="achievement-badge">✓ Unlocked</div>
              )}
              {!achievement.unlocked && (
                <div className="achievement-points">+{achievement.points} pts</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="operation-stats">
        <h2 className="section-title">📊 Operation Statistics</h2>
        <div className="operation-grid">
          <div className="operation-stat">
            <span className="operation-symbol">+</span>
            <span className="operation-count">{stats.additions || 0}</span>
          </div>
          <div className="operation-stat">
            <span className="operation-symbol">−</span>
            <span className="operation-count">{stats.subtractions || 0}</span>
          </div>
          <div className="operation-stat">
            <span className="operation-symbol">×</span>
            <span className="operation-count">{stats.multiplications || 0}</span>
          </div>
          <div className="operation-stat">
            <span className="operation-symbol">÷</span>
            <span className="operation-count">{stats.divisions || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
