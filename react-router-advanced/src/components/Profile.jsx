import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  return (
    <div>
      <h2>Profile Page (Protected)</h2>
      <nav style={{ marginBottom: '10px' }}>
        <Link to="details">Profile Details</Link> |{' '}
        <Link to="settings">Profile Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
};

export default Profile;
