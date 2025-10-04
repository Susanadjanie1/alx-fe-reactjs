import React from 'react';

const UserProfile = ({ name, age, bio }) => {
  return (
    <div style={{ border: '2px solid blue', padding: '12px', margin: '12px' }}>
      <h2 style={{ color: 'blue' }}>{name}</h2>
      <p>
        Age: <span style={{ fontSize: '10px' }}>{age}</span>
      </p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default UserProfile;