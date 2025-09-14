import React from 'react';

// Pass `props` as an argument to the function.
// Using destructuring is a common and clean way to do this.
const UserProfile = ({ name, age, bio }) => {
  return (
    <div style={{ border: '2px solid blue', padding: '12px', margin: '12px' }}>
      <h2 style={{ color: 'blue' }}>{name}</h2>
      <p>Age: {age}</p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default UserProfile;