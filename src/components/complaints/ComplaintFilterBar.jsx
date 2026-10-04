import React from 'react';
import './ComplaintFilterBar.css';

const statusOptions = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'];

function ComplaintFilterBar({ filter, onFilterChange, assetQuery, onAssetQueryChange }) {
  return (
    <div className="filter-bar">
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        {statusOptions.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
      </select>
      <input
        type="text"
        placeholder="Search by asset name..."
        value={assetQuery}
        onChange={(e) => onAssetQueryChange(e.target.value)}
      />
    </div>
  );
}

export default ComplaintFilterBar;
