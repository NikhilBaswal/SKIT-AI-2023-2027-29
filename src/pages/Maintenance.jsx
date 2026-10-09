import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ScheduleList from '../components/maintenance/ScheduleList';
import MaintenanceForm from '../components/maintenance/MaintenanceForm';
import './Maintenance.css';

const mockSchedules = [
  { id: 1, assetName: 'Pump A1', taskType: 'Motor servicing', frequency: 'Monthly', nextDueDate: '2026-11-05' },
  { id: 2, assetName: 'Tank C3', taskType: 'Cleaning', frequency: 'Quarterly', nextDueDate: '2026-10-15' },
];

function Maintenance() {
  const [schedules, setSchedules] = useState(mockSchedules);

  const handleAdd = (newSchedule) => {
    setSchedules((prev) => [...prev, { id: prev.length + 1, ...newSchedule }]);
  };

  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="maintenance-body">
          <h3>Maintenance Scheduling</h3>
          <MaintenanceForm onAdd={handleAdd} />
          <ScheduleList schedules={schedules} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
