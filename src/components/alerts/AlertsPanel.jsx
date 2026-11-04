import React, { useEffect, useState } from 'react';
import { getUnreadAlerts, resolveAlert } from '../../services/alertService';
import './AlertsPanel.css';

function AlertsPanel() {
  const [alerts, setAlerts] = useState([]);

  const load = async () => {
    try {
      const res = await getUnreadAlerts();
      setAlerts(res.data.data || []);
    } catch (err) {
      console.error('Failed to load alerts', err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleResolve = async (id) => {
    try {
      await resolveAlert(id);
      load();
    } catch (err) {
      console.error('Failed to resolve alert', err);
    }
  };

  if (alerts.length === 0) return <p className="alerts-empty">No active alerts.</p>;

  return (
    <div className="alerts-panel">
      {alerts.map((a) => (
        <div key={a.id} className="alert-item">
          <span className="alert-type">{a.type}</span>
          <span className="alert-message">{a.message}</span>
          <button onClick={() => handleResolve(a.id)}>Resolve</button>
        </div>
      ))}
    </div>
  );
}

export default AlertsPanel;
