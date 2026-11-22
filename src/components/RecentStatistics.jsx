const RecentStatistics = ({ records, onEdit, onDelete }) => {
  return (
    <div className="card stats-section">
      <h2>Recent Health Statistics</h2>

      {records.length === 0 ? (
        <p className="no-data">No records yet. Click &quot;+ Add data&quot; to get started!</p>
      ) : (
        <div className="record-list">
          {records.map((record) => (
            <div key={record.id} className="record-item">
              <div className="record-info">
                <div className="record-date">{record.date}</div>
                <div className="record-stats">
                  <span>
                    🍽️ <span className="stat-intake">Calories Intake = {record.caloriesIntake}</span>
                  </span>
                  <span>
                    🔥 <span className="stat-burned">Calories Burned = {record.caloriesBurned}</span>
                  </span>
                </div>
                {record.description && (
                  <div className="record-desc">{record.description}</div>
                )}
              </div>
              <div className="record-actions">
                <button className="btn-edit" onClick={() => onEdit(record)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(record.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentStatistics;
