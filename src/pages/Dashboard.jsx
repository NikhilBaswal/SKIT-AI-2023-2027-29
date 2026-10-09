import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-body">
          <h3>Welcome to the O&amp;M Dashboard</h3>
          <p>Supply status, complaints and maintenance summary will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;