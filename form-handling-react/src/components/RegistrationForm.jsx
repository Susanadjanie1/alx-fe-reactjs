import React, { useState } from 'react';

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (!username) tempErrors.username = 'Username is required';
    if (!email) tempErrors.email = 'Email is required';
    if (!password) tempErrors.password = 'Password is required';

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) return;

    alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);

    // Reset form
    setUsername('');
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form (Controlled Component)</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Username:</label><br />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Password:</label><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;

