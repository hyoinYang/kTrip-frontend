import React, { useState } from "react";
import "./reset.css";
import "./styles/Login.css"; // Import the CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your login logic, like sending a request to your backend
    console.log("Username:", username);
    console.log("Password:", password);
    // Reset the form after submission
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="form">
        <h1>K-trip</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="extra-links">
            <a href="#">Forgot ID or Password?</a>
            <span> | </span>
            <a href="#">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
