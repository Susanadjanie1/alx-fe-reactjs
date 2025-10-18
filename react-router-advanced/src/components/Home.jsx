import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>Use the navigation to explore nested, dynamic, and protected routes.</p>
      <Link to="/profile">Go to Profile</Link>
    </div>
  );
};

export default Home;
