import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import AssetList from '../components/assets/AssetList';
import AssetForm from '../components/assets/AssetForm';
import Loader from '../components/common/Loader';
import {
  getAllAssets, createAsset, updateAsset, deleteAsset,
} from '../services/assetService';
import './Assets.css';

function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAsset, setEditingAsset] = useState(null);
  const [error, setError] = useState('');

  const loadAssets = async () => {
    try {
      setLoading(true);
      const res = await getAllAssets();
      setAssets(res.data.data || []);
    } catch (err) {
      setError('Failed to load assets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingAsset) {
        await updateAsset(editingAsset.id, formData);
      } else {
        await createAsset(formData);
      }
      setEditingAsset(null);
      loadAssets();
    } catch (err) {
      setError('Failed to save asset.');
    }
  };

  const handleEdit = (asset) => setEditingAsset(asset);
  const handleCancel = () => setEditingAsset(null);

  const handleDelete = async (id) => {
    try {
      await deleteAsset(id);
      loadAssets();
    } catch (err) {
      setError('Failed to delete asset.');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="assets-body">
          <h3>Asset Management</h3>
          {error && <p className="page-error">{error}</p>}
          <AssetForm onSubmit={handleSubmit} editingAsset={editingAsset} onCancel={handleCancel} />
          {loading ? <Loader /> : (
            <AssetList assets={assets} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Assets;
