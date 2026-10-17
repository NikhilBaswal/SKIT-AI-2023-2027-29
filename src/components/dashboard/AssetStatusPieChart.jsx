import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartCard.css';

const COLORS = { ACTIVE: '#16a34a', INACTIVE: '#64748b', UNDER_MAINTENANCE: '#f59e0b', FAULTY: '#dc2626' };

function AssetStatusPieChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-card"><h4>Asset Status Breakdown</h4><p className="chart-empty">No asset data yet.</p></div>;
  }
  return (
    <div className="chart-card">
      <h4>Asset Status Breakdown</h4>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="status" outerRadius={80} label>
            {data.map((entry) => (
              <Cell key={entry.status} fill={COLORS[entry.status] || '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AssetStatusPieChart;
