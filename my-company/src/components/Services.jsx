import React from 'react';

const Services = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#d0d0d0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>Our Services</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ marginBottom: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>Technology Consulting</li>
        <li style={{ marginBottom: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>Market Analysis</li>
        <li style={{ marginBottom: '10px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>Product Development</li>
      </ul>
    </div>
  );
};

export default Services;
