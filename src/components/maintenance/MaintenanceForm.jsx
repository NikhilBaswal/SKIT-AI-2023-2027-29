import React, { useState } from 'react';
import './MaintenanceForm.css';

const frequencies = ['Weekly', 'Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'];

function MaintenanceForm({ onAdd }) {
  const [assetName, setAssetName] = useState('');
  const [taskType, setTaskType] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [nextDueDate, setNextDueDate] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!assetName.trim()) newErrors.assetName = 'Asset name is required.';
    if (!taskType.trim()) newErrors.taskType = 'Task type is required.';
    if (!nextDueDate) newErrors.nextDueDate = 'Next due date is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAdd({ assetName, taskType, frequency, nextDueDate });
    setAssetName('');
    setTaskType('');
    setFrequency('Monthly');
    setNextDueDate('');
    setErrors({});
  };

  return (
    <form className="maintenance-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          placeholder="Asset name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
        />
        {errors.assetName && <span className="field-error">{errors.assetName}</span>}
      </div>

      <div className="form-field">
        <input
          type="text"
          placeholder="Task type (e.g. Pump servicing)"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
        />
        {errors.taskType && <span className="field-error">{errors.taskType}</span>}
      </div>

      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        {frequencies.map((f) => <option key={f} value={f}>{f}</option>)}
      </select>

      <div className="form-field">
        <input
          type="date"
          value={nextDueDate}
          onChange={(e) => setNextDueDate(e.target.value)}
        />
        {errors.nextDueDate && <span className="field-error">{errors.nextDueDate}</span>}
      </div>

      <button type="submit">Schedule Maintenance</button>
    </form>
  );
}

export default MaintenanceForm;
