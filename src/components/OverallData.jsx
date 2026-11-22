import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#667eea', '#27ae60', '#e67e22', '#e74c3c'];

const OverallData = ({ records }) => {
  const totalIntake = records.reduce((sum, r) => sum + Number(r.caloriesIntake), 0);
  const totalBurned = records.reduce((sum, r) => sum + Number(r.caloriesBurned), 0);
  const netCalories = Math.max(totalIntake - totalBurned, 0);

  const hasData = totalIntake > 0 || totalBurned > 0;

  const pieData = hasData
    ? [
        { name: 'Calories Intake', value: totalIntake },
        { name: 'Calories Burned', value: totalBurned },
      ]
    : [
        { name: 'No Data', value: 1 },
      ];

  const colors = hasData ? COLORS : ['#e0e0e0'];

  return (
    <div className="card chart-section">
      <h2>Overall Data</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={hasData ? 4 : 0}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) =>
                name === 'No Data' ? ['—', 'No Data'] : [`${value} kcal`, name]
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {hasData && (
        <div style={{ textAlign: 'center', fontSize: '0.88rem', color: '#777', marginTop: 8 }}>
          Net Calories: <strong style={{ color: netCalories > 0 ? '#e74c3c' : '#27ae60' }}>{totalIntake - totalBurned} kcal</strong>
        </div>
      )}
    </div>
  );
};

export default OverallData;
