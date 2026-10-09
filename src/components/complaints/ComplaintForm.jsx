import React, { useState } from 'react';
import './ComplaintForm.css';

function ComplaintForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [assetName, setAssetName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description should be at least 10 characters.';
    }
    if (!assetName.trim()) {
      newErrors.assetName = 'Please specify the related asset.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ description: description.trim(), assetName: assetName.trim() });
    setDescription('');
    setAssetName('');
    setErrors({});
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <input
          type="text"
          placeholder="Asset (e.g. Pump A1)"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        {errors.assetName && <span className="field-error">{errors.assetName}</span>}
      </div>
      <div className="form-field">
        <input
          type="text"
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </div>
      <button type="submit">Raise Complaint</button>
    </form>
  );
}

export default ComplaintForm;
