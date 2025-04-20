import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ onSwitch, onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post(
        "/api/register", // Using proxy now
        { name, email, password },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 201) {
        onRegisterSuccess();
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.message === "Network Error") {
        setError("Cannot connect to server. Please check your connection.");
      } else {
        setError(err.response?.data?.error || "Registration failed");
      }
      console.error("Error details:", err);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <img src="/assets/logo.png" alt="CampusConnect Logo" className="logo" />
        <h1>Create Account</h1>
        {error && (
          <div className="error-message" style={{ color: "red", margin: "10px 0" }}>
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
        <button type="submit">SIGN UP</button>
        <div className="google-container">
          <p>or sign up with</p>
          <button type="button" className="social">
            <img src="/assets/google.png" alt="Google" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;