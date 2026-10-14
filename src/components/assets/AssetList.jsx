import React from 'react';
import AssetStatusBadge from './AssetStatusBadge';
import './AssetList.css';

function AssetList({ assets, onEdit, onDelete }) {
  if (!assets || assets.length === 0) {
    return <p className="empty-text">No assets added yet.</p>;
  }

  return (
    <table className="asset-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.id}</td>
            <td>{asset.name}</td>
            <td>{asset.type}</td>
            <td>{asset.location || '-'}</td>
            <td><AssetStatusBadge status={asset.status} /></td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(asset)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(asset.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssetList;
