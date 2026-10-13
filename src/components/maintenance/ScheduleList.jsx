import React from 'react';
import './ScheduleList.css';

function ScheduleList({ schedules, onDelete }) {
  if (!schedules || schedules.length === 0) {
    return <p className="empty-text">No maintenance scheduled yet.</p>;
  }

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Asset</th>
          <th>Task Type</th>
          <th>Frequency</th>
          <th>Next Due</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((s) => (
          <tr key={s.id} className={isOverdue(s.nextDueDate) ? 'overdue-row' : ''}>
            <td>{s.id}</td>
            <td>{s.assetName}</td>
            <td>{s.taskType}</td>
            <td>{s.frequency}</td>
            <td>{s.nextDueDate}</td>
            <td>{isOverdue(s.nextDueDate) ? 'Overdue' : 'Upcoming'}</td>
            <td>
              <button className="delete-btn" onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleList;
