import React from 'react';
import AnomalyBadge from './AnomalyBadge';
import './LogHistory.css';

function LogHistory({ logs }) {
  if (!logs || logs.length === 0) {
    return <p className="empty-text">No monitoring logs recorded yet.</p>;
  }

  return (
    <table className="log-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Asset</th>
          <th>Supply Hrs</th>
          <th>Pressure</th>
          <th>pH</th>
          <th>TDS</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.logDate}</td>
            <td>{log.assetName}</td>
            <td>{log.supplyHours ?? '-'}</td>
            <td>{log.pressure ?? '-'}</td>
            <td>{log.phValue ?? '-'}</td>
            <td>{log.tdsValue ?? '-'}</td>
            <td><AnomalyBadge anomaly={log.anomaly} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LogHistory;
