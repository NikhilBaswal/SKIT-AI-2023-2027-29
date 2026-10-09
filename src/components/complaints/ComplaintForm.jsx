import React, { useState } from 'react';
import './ComplaintForm.css';

function ComplaintForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [assetName, setAssetName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please enter a complaint description.');
      return;
    }
    onAdd({ description, assetName });
    setDescription('');
    setAssetName('');
    setError('');
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Asset (e.g. Pump A1)"
        value={assetName}
        onChange={(e) => setAssetName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Raise Complaint</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}

export default ComplaintForm;
