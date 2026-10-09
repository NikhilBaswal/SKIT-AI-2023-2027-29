import React, { useState, useEffect } from 'react';
import './AssetForm.css';

const assetTypes = ['PUMP', 'TANK', 'PIPELINE', 'VALVE'];
const assetStatuses = ['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE', 'FAULTY'];

const emptyForm = { name: '', type: 'PUMP', location: '', status: 'ACTIVE', panchayatId: 1 };

function AssetForm({ onSubmit, editingAsset, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAsset) {
      setForm({
        name: editingAsset.name,
        type: editingAsset.type,
        location: editingAsset.location || '',
        status: editingAsset.status,
        panchayatId: editingAsset.panchayatId,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingAsset]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Asset name is required.';
    if (!form.type) newErrors.type = 'Asset type is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    setForm(emptyForm);
    setErrors({});
  };

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Asset name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <select name="type" value={form.type} onChange={handleChange}>
          {assetTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          {assetStatuses.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>

        <button type="submit">{editingAsset ? 'Update' : 'Add'} Asset</button>
        {editingAsset && (
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default AssetForm;
