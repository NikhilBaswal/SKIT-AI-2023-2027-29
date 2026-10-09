import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ComplaintList from '../components/complaints/ComplaintList';
import ComplaintForm from '../components/complaints/ComplaintForm';
import './Complaints.css';

// Static mock data for now — connected to backend APIs in Week 4
const mockComplaints = [
  { id: 1, description: 'No water supply since morning', status: 'OPEN', assetName: 'Pump A1' },
  { id: 2, description: 'Leakage near main pipeline', status: 'IN_PROGRESS', assetName: 'Pipeline B2' },
  { id: 3, description: 'Low water pressure in tank area', status: 'RESOLVED', assetName: 'Tank C3' },
];

function Complaints() {
  const [complaints, setComplaints] = useState(mockComplaints);

  const handleAddComplaint = (newComplaint) => {
    setComplaints((prev) => [
      ...prev,
      { id: prev.length + 1, status: 'OPEN', ...newComplaint },
    ]);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="complaints-body">
          <h3>Complaints</h3>
          <ComplaintForm onAdd={handleAddComplaint} />
          <ComplaintList complaints={complaints} />
        </div>
      </div>
    </div>
  );
}

export default Complaints;
