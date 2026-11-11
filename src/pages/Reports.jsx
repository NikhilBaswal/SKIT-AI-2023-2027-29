import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import SupplyChart from '../components/dashboard/SupplyChart';
import ComplaintChart from '../components/dashboard/ComplaintChart';
import AlertsPanel from '../components/alerts/AlertsPanel';
import Loader from '../components/common/Loader';
import { getSupplyTrend, getComplaintStats } from '../services/reportService';
import './Reports.css';

function Reports() {
  const [supplyTrend, setSupplyTrend] = useState([]);
  const [complaintStats, setComplaintStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [trendRes, statsRes] = await Promise.all([
          getSupplyTrend(7),
          getComplaintStats(),
        ]);
        setSupplyTrend((trendRes.data.data || []).map((p) => ({
          date: p.date,
          supplyHours: p.averageSupplyHours,
        })));
        setComplaintStats((statsRes.data.data || []).map((s) => ({
          status: s.status,
          count: s.count,
        })));
      } catch (err) {
        console.error('Failed to load reports', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="reports-body">
          <h3>Reports & Alerts</h3>
          {loading ? <Loader /> : (
            <div className="charts-row">
              <SupplyChart data={supplyTrend} />
              <ComplaintChart data={complaintStats} />
            </div>
          )}
          <h4>Active Alerts</h4>
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
}

export default Reports;
