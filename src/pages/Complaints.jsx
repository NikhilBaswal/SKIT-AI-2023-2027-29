import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import ComplaintList from '../components/complaints/ComplaintList';
import ComplaintForm from '../components/complaints/ComplaintForm';
import ComplaintFilterBar from '../components/complaints/ComplaintFilterBar';
import ConfirmDialog from '../components/common/ConfirmDialog';
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
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [assetQuery, setAssetQuery] = useState('');
  const [deleteId, setDeleteId] = useState(null);

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
    } finally {
      setDeleteId(null);
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesAsset = (c.assetName || '').toLowerCase().includes(assetQuery.toLowerCase());
    return matchesStatus && matchesAsset;
  });

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="complaints-body">
          <h3>Complaints</h3>
          {error && <p className="page-error">{error}</p>}
          <ComplaintForm onAdd={handleAddComplaint} />
          <ComplaintFilterBar
            filter={statusFilter}
            onFilterChange={setStatusFilter}
            assetQuery={assetQuery}
            onAssetQueryChange={setAssetQuery}
          />
          {loading ? <Loader /> : (
            <ComplaintList
              complaints={filteredComplaints}
              onStatusChange={handleStatusChange}
              onDelete={setDeleteId}
            />
          )}
          <ConfirmDialog
            open={deleteId !== null}
            message="Delete this complaint?"
            onConfirm={() => handleDelete(deleteId)}
            onCancel={() => setDeleteId(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default Complaints;
