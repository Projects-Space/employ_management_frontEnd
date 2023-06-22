import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login logic here
    // You can make API requests, handle authentication, etc.

    // Clear the input fields
    setUsername("");
    setPassword("");

    // Redirect to the dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="form-input"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p
          onClick={() => {
            navigate("register");
          }}
        >
          create new account
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
