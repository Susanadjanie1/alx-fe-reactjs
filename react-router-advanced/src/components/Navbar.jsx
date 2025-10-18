import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: 12 }}>Home</Link>
      <Link to="/about" style={{ marginRight: 12 }}>About</Link>
      <Link to="/profile" style={{ marginRight: 12 }}>Profile</Link>
      <Link to="/post/1" style={{ marginRight: 12 }}>Sample Post</Link>
      {!isAuth ? (
        <Link to="/login" style={{ marginLeft: 12 }}>Login</Link>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
      )}
    </nav>
  );
}