import React from 'react';
import './AnomalyBadge.css';

function AnomalyBadge({ anomaly }) {
  if (!anomaly) {
    return <span className="anomaly-badge badge-normal">Normal</span>;
  }
  return <span className="anomaly-badge badge-anomaly">Anomaly</span>;
}

export default AnomalyBadge;
