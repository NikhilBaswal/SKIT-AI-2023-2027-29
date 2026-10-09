import React, { useState } from 'react';
import './DailyLogForm.css';

function DailyLogForm({ assets, onSubmit }) {
  const [form, setForm] = useState({
    assetId: '',
    logDate: '',
    supplyHours: '',
    pressure: '',
    phValue: '',
    tdsValue: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.assetId) newErrors.assetId = 'Please select an asset.';
    if (!form.logDate) newErrors.logDate = 'Date is required.';
    if (form.supplyHours === '' || form.supplyHours < 0 || form.supplyHours > 24) {
      newErrors.supplyHours = 'Supply hours must be between 0 and 24.';
    }
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
    onSubmit({
      assetId: Number(form.assetId),
      logDate: form.logDate,
      supplyHours: parseFloat(form.supplyHours),
      pressure: form.pressure ? parseFloat(form.pressure) : null,
      phValue: form.phValue ? parseFloat(form.phValue) : null,
      tdsValue: form.tdsValue ? parseFloat(form.tdsValue) : null,
    });
    setForm({ assetId: '', logDate: '', supplyHours: '', pressure: '', phValue: '', tdsValue: '' });
    setErrors({});
  };

  return (
    <form className="log-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <select name="assetId" value={form.assetId} onChange={handleChange}>
          <option value="">Select Asset</option>
          {assets.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        {errors.assetId && <span className="field-error">{errors.assetId}</span>}
      </div>

      <div className="form-field">
        <input type="date" name="logDate" value={form.logDate} onChange={handleChange} />
        {errors.logDate && <span className="field-error">{errors.logDate}</span>}
      </div>

      <div className="form-field">
        <input
          type="number"
          step="0.1"
          name="supplyHours"
          placeholder="Supply hours"
          value={form.supplyHours}
          onChange={handleChange}
        />
        {errors.supplyHours && <span className="field-error">{errors.supplyHours}</span>}
      </div>

      <input type="number" step="0.1" name="pressure" placeholder="Pressure" value={form.pressure} onChange={handleChange} />
      <input type="number" step="0.1" name="phValue" placeholder="pH value" value={form.phValue} onChange={handleChange} />
      <input type="number" step="0.1" name="tdsValue" placeholder="TDS value" value={form.tdsValue} onChange={handleChange} />

      <button type="submit">Add Log</button>
    </form>
  );
}

export default DailyLogForm;
