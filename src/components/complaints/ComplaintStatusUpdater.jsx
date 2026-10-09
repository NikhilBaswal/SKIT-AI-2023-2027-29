import React from 'react';
import './ComplaintStatusUpdater.css';

const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

function ComplaintStatusUpdater({ currentStatus, onChange }) {
  return (
    <select
      className="status-select"
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status.replace('_', ' ')}
        </option>
      ))}
    </select>
  );
}

export default ComplaintStatusUpdater;
