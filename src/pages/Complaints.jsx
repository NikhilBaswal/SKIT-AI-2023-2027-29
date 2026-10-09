import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ComplaintList from '../components/complaints/ComplaintList';
import ComplaintForm from '../components/complaints/ComplaintForm';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import {
  getAllComplaints, createComplaint, updateComplaintStatus, deleteComplaint,
} from '../services/complaintService';
import './Complaints.css';

function Complaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const res = await getAllComplaints();
      setComplaints(res.data.data || []);
    } catch (err) {
      setError('Failed to load complaints.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleAddComplaint = async ({ description, assetName }) => {
    try {
      await createComplaint({
        raisedById: user?.id || 1,
        description,
        assetId: null, // resolved from assetName in a future enhancement
      });
      loadComplaints();
    } catch (err) {
      setError('Failed to raise complaint.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      loadComplaints();
    } catch (err) {
      setError('Failed to update complaint status.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComplaint(id);
      loadComplaints();
    } catch (err) {
      setError('Failed to delete complaint.');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="complaints-body">
          <h3>Complaints</h3>
          {error && <p className="page-error">{error}</p>}
          <ComplaintForm onAdd={handleAddComplaint} />
          {loading ? <Loader /> : (
            <ComplaintList
              complaints={complaints}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Complaints;
