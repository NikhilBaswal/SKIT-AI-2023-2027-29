import React from 'react';
import './ComplaintStatusBadge.css';

const statusColors = {
  OPEN: 'badge-open',
  IN_PROGRESS: 'badge-progress',
  RESOLVED: 'badge-resolved',
};

function ComplaintStatusBadge({ status }) {
  return (
    <span className={`badge ${statusColors[status] || ''}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default ComplaintStatusBadge;
