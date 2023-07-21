import React, { useState } from "react";
import "../../style/Login.css";
import myImage from "./signup.png";
import axios from "axios";
import { fetchData } from "../../axios_URL";
import { Navigate } from 'react-router-dom';

function LoginForm({onLogin}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    usernameoremail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetchData(
        "post",
        "/login",
        {
          usernameoremail: formData.usernameoremail,
          password: formData.password,
        },
        setError
      );

      // Save token in local storage
      localStorage.setItem("token", response.data.token);

      // Set authorization header for future requests
      
      // Redirect to home page or dashboard
      // Replace this with your own logic
      setIsAuthenticated(true);
      
      onLogin();
      window.location.href = "/";
    
    } catch (error) {
      setError("Invalid username or password");
    }
  };
  if (isAuthenticated) {
    return 
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="login-container">
      <div className="login-img">
            <img src={myImage} alt="My Image" />
          </div>
        <div className="login-form-container">
          {error && <p className="error-message">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="usernameoremail">Username or Email:</label>
              <input
                type="text"
                id="usernameoremail"
                name="usernameoremail"
                value={formData.usernameoremail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;