import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const WeeklyTrends = ({ records }) => {
  // Filter records from the last 7 calendar days
  const getLast7DaysData = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return records.filter((record) => {
      const recordDate = new Date(record.date + 'T00:00:00');
      return recordDate >= sevenDaysAgo && recordDate <= today;
    });
  };

  const weeklyData = getLast7DaysData();

  if (weeklyData.length === 0) return null;

  const chartData = weeklyData.map((r) => ({
    date: r.date,
    'Calories Intake': r.caloriesIntake,
    'Calories Burned': r.caloriesBurned,
  }));

  return (
    <div className="card chart-section">
      <h2>Weekly Health Trends</h2>
      {chartData.length === 0 ? (
        <p className="no-data">No records in the last 7 days.</p>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Calories Intake" fill="#667eea" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Calories Burned" fill="#27ae60" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default WeeklyTrends;
