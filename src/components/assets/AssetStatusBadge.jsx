import React from 'react';
import './AssetStatusBadge.css';

const statusColors = {
  ACTIVE: 'badge-active',
  INACTIVE: 'badge-inactive',
  UNDER_MAINTENANCE: 'badge-maintenance',
  FAULTY: 'badge-faulty',
};

function AssetStatusBadge({ status }) {
  return (
    <span className={`asset-badge ${statusColors[status] || ''}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default AssetStatusBadge;
