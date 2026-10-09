import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const allMenuItems = [
  { label: 'Dashboard', path: '/', roles: ['ADMIN', 'OPERATOR'] },
  { label: 'Assets', path: '/assets', roles: ['ADMIN', 'OPERATOR'] },
  { label: 'Monitoring', path: '/monitoring', roles: ['ADMIN', 'OPERATOR'] },
  { label: 'Complaints', path: '/complaints', roles: ['ADMIN', 'OPERATOR', 'VILLAGER'] },
  { label: 'Maintenance', path: '/maintenance', roles: ['ADMIN'] },
];

function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;
  const visibleItems = allMenuItems.filter((item) => !role || item.roles.includes(role));

  return (
    <aside className="sidebar">
      <ul>
        {visibleItems.map((item) => (
          <li key={item.path}>{item.label}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;