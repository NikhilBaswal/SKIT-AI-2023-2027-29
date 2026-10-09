import React from 'react';
import './StatsCard.css';

function StatsCard({ title, value, icon, color, trend }) {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon">{icon}</div>
      <div>
        <p className="stats-title">{title}</p>
        <h3 className="stats-value">{value}</h3>
        {trend && (
          <span className={`stats-trend trend-${trend}`}>
            {trend === 'up' ? '▲ Rising' : trend === 'down' ? '▼ Falling' : '● Steady'}
          </span>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
