import './History.css'

function History({ history, onClear }) {
  if (history.length === 0) return null

  return (
    <div className="history">
      <div className="history-header">
        <h3>📜 Recent Calculations</h3>
        <button className="clear-history-btn" onClick={onClear}>
          Clear
        </button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-expression">{item.expression}</div>
            <div className="history-timestamp">{item.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
