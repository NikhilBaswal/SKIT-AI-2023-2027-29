import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import SupplyChart from '../components/dashboard/SupplyChart';
import ComplaintChart from '../components/dashboard/ComplaintChart';
import Loader from '../components/common/Loader';
import { getDashboardSummary, getSupplyTrend, getComplaintStats } from '../services/reportService';
import './Dashboard.css';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [supplyTrend, setSupplyTrend] = useState([]);
  const [complaintStats, setComplaintStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [summaryRes, trendRes, statsRes] = await Promise.all([
          getDashboardSummary(),
          getSupplyTrend(7),
          getComplaintStats(),
        ]);
        setSummary(summaryRes.data.data);
        setSupplyTrend((trendRes.data.data || []).map((p) => ({
          date: p.date,
          supplyHours: p.averageSupplyHours,
        })));
        setComplaintStats((statsRes.data.data || []).map((s) => ({
          status: s.status,
          count: s.count,
        })));
      } catch (err) {
        console.error('Failed to load dashboard reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
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
            <StatsCard title="Total Assets" value={summary?.totalAssets || 0} icon="🛠️" color="#0f766e" />
            <StatsCard title="Active Assets" value={summary?.activeAssets || 0} icon="✅" color="#16a34a" />
            <StatsCard title="Open Complaints" value={summary?.openComplaints || 0} icon="⚠️" color="#dc2626" />
          </div>

          <div className="charts-row">
            <SupplyChart data={supplyTrend} />
            <ComplaintChart data={complaintStats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
