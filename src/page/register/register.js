import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Import the CSS file for styling

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform registration logic here
    // You can make API requests, handle user creation, etc.

    // Clear the input fields
    setUsername('');
    setEmail('');
    setPassword('');

    // Redirect to the login page after successful registration
    navigate('/');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="form-input"
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
