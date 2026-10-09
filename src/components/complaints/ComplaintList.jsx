import React from 'react';
import ComplaintStatusUpdater from './ComplaintStatusUpdater';
import './ComplaintList.css';

function ComplaintList({ complaints, onStatusChange, onDelete }) {
  if (!complaints || complaints.length === 0) {
    return <p className="empty-text">No complaints raised yet.</p>;
  }

  return (
    <table className="complaint-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Asset</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.description}</td>
            <td>{c.assetName}</td>
            <td>
              <ComplaintStatusUpdater
                currentStatus={c.status}
                onChange={(newStatus) => onStatusChange(c.id, newStatus)}
              />
            </td>
            <td>
              <button className="delete-btn" onClick={() => onDelete(c.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComplaintList;
