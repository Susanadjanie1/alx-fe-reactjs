import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const { username, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    setSubmissionMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required.');
      setSubmissionMessage('');
      return;
    }

    setError('');
    console.log('Form Data Validated:', formData);
    setSubmissionMessage('Registration successful! (Data logged to console)');

    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Controlled Component Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}      
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}         
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}      
            onChange={handleChange}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {submissionMessage && <p style={{ color: 'green' }}>{submissionMessage}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
