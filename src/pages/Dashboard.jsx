import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import SupplyChart from '../components/dashboard/SupplyChart';
import ComplaintChart from '../components/dashboard/ComplaintChart';
import Loader from '../components/common/Loader';
import { getAllAssets } from '../services/assetService';
import './Dashboard.css';

// Mock supply/complaint trend data until full reports API is ready (Week 4+)
const mockSupplyTrend = [
  { date: 'Mon', supplyHours: 6 },
  { date: 'Tue', supplyHours: 7 },
  { date: 'Wed', supplyHours: 5 },
  { date: 'Thu', supplyHours: 8 },
  { date: 'Fri', supplyHours: 6.5 },
  { date: 'Sat', supplyHours: 7.5 },
  { date: 'Sun', supplyHours: 6 },
];

const mockComplaintStats = [
  { status: 'OPEN', count: 4 },
  { status: 'IN_PROGRESS', count: 2 },
  { status: 'RESOLVED', count: 9 },
];

function Dashboard() {
  const [assetCount, setAssetCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await getAllAssets();
        const assets = res.data.data || [];
        setAssetCount(assets.length);
        setActiveCount(assets.filter((a) => a.status === 'ACTIVE').length);
      } catch (err) {
        console.error('Failed to load assets', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-body">
          <h3>O&M Overview</h3>

          <div className="stats-row">
            <StatsCard title="Total Assets" value={assetCount} icon="🛠️" color="#0f766e" />
            <StatsCard title="Active Assets" value={activeCount} icon="✅" color="#16a34a" />
            <StatsCard title="Open Complaints" value={mockComplaintStats[0].count} icon="⚠️" color="#dc2626" />
          </div>

          <div className="charts-row">
            <SupplyChart data={mockSupplyTrend} />
            <ComplaintChart data={mockComplaintStats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
