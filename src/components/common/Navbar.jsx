import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUnreadAlerts } from '../../services/alertService';
import './Navbar.css';

function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await getUnreadAlerts();
        setUnreadCount((res.data.data || []).length);
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      }
    };
    fetchAlerts();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <h2 className="navbar-title">Gram Panchayat Water O&amp;M</h2>
      <div className="navbar-right">
        {unreadCount > 0 && <span className="alert-badge">{unreadCount} alerts</span>}
        <span className="navbar-user">{user?.email} ({user?.role})</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;