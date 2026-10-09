import React from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import './Dashboard.css';

function Complaints() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="dashboard-body">
          <h3>Complaints</h3>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
