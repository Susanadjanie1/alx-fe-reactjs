import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>My Company</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Home</Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>About</Link>
        <Link to="/services" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Services</Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
