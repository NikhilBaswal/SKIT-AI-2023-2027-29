import React from 'react';
import ComplaintStatusBadge from './ComplaintStatusBadge';
import './ComplaintList.css';

function ComplaintList({ complaints }) {
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
        </tr>
      </thead>
      <tbody>
        {complaints.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.description}</td>
            <td>{c.assetName}</td>
            <td><ComplaintStatusBadge status={c.status} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ComplaintList;
