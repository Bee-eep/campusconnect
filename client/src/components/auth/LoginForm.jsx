import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSwitch, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      }, { withCredentials: true });
      
      onLoginSuccess();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <img src="/assets/logo.png" alt="CampusConnect Logo" className="logo" />
        <h1>Sign in</h1>
        {error && <div className="error-message">{error}</div>}
        <span>or use your account</span>
        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a style={{ color: "black" }}>Forgot your password?</a>
        <button type="submit">Sign In</button>
        <div className="google-container">
          <p>or sign in with</p>
          <a href="/ADMIN/admin.html" className="social">
            <img src="/assets/google.png" alt="Google" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;