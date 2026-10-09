import React from 'react';
import './Sidebar.css';

const menuItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Assets', path: '/assets' },
  { label: 'Monitoring', path: '/monitoring' },
  { label: 'Complaints', path: '/complaints' },
  { label: 'Maintenance', path: '/maintenance' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>{item.label}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;