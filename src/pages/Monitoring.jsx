import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DailyLogForm from '../components/monitoring/DailyLogForm';
import LogHistory from '../components/monitoring/LogHistory';
import Loader from '../components/common/Loader';
import { getAllAssets } from '../services/assetService';
import { createLog, getLogsByAsset } from '../services/monitoringService';
import './Monitoring.css';

function Monitoring() {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const res = await getAllAssets();
        const assetList = res.data.data || [];
        setAssets(assetList);
        if (assetList.length > 0) {
          setSelectedAssetId(assetList[0].id);
        }
      } catch (err) {
        setError('Failed to load assets.');
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  useEffect(() => {
    const loadLogs = async () => {
      if (!selectedAssetId) return;
      try {
        const res = await getLogsByAsset(selectedAssetId);
        setLogs(res.data.data || []);
      } catch (err) {
        setError('Failed to load logs.');
      }
    };
    loadLogs();
  }, [selectedAssetId]);

  const handleAddLog = async (logData) => {
    try {
      await createLog(logData);
      if (logData.assetId === selectedAssetId) {
        const res = await getLogsByAsset(selectedAssetId);
        setLogs(res.data.data || []);
      }
    } catch (err) {
      setError('Failed to save monitoring log.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="monitoring-body">
          <h3>Daily Monitoring</h3>
          {error && <p className="page-error">{error}</p>}

          <DailyLogForm assets={assets} onSubmit={handleAddLog} />

          <div className="asset-filter">
            <label>View logs for:</label>
            <select
              value={selectedAssetId || ''}
              onChange={(e) => setSelectedAssetId(Number(e.target.value))}
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>

          <LogHistory logs={logs} />
        </div>
      </div>
    </div>
  );
}

export default Monitoring;
