import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    setSubmissionMessage('');
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation Logic: Check for empty fields
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required.');
      setSubmissionMessage('');
      return;
    }

    // If validation passes, simulate API call
    setError('');
    console.log('Form Data Validated:', formData);
    
    // Simulate user registration success
    setSubmissionMessage('Registration successful! (Data logged to console)');
    
    // Reset the form data after successful submission
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
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        {/* Display Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Display Success Message */}
        {submissionMessage && <p style={{ color: 'green' }}>{submissionMessage}</p>}
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;