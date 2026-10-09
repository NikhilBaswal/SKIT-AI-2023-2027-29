import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ScheduleList from '../components/maintenance/ScheduleList';
import MaintenanceForm from '../components/maintenance/MaintenanceForm';
import Loader from '../components/common/Loader';
import { getAllAssets } from '../services/assetService';
import { getAllSchedules, createSchedule, deleteSchedule } from '../services/maintenanceService';
import './Maintenance.css';

function Maintenance() {
  const [schedules, setSchedules] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [scheduleRes, assetRes] = await Promise.all([getAllSchedules(), getAllAssets()]);
      setSchedules(scheduleRes.data.data || []);
      setAssets(assetRes.data.data || []);
    } catch (err) {
      setError('Failed to load maintenance data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (formData) => {
    const matchedAsset = assets.find(
      (a) => a.name.toLowerCase() === formData.assetName.toLowerCase()
    );
    if (!matchedAsset) {
      setError('Asset not found. Please enter an exact asset name.');
      return;
    }
    try {
      await createSchedule({
        assetId: matchedAsset.id,
        nextDueDate: formData.nextDueDate,
        frequency: formData.frequency,
        taskType: formData.taskType,
      });
      loadData();
    } catch (err) {
      setError('Failed to schedule maintenance.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSchedule(id);
      loadData();
    } catch (err) {
      setError('Failed to delete schedule.');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="maintenance-body">
          <h3>Maintenance Scheduling</h3>
          {error && <p className="page-error">{error}</p>}
          <MaintenanceForm onAdd={handleAdd} />
          {loading ? <Loader /> : (
            <ScheduleList schedules={schedules} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
