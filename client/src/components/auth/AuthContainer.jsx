import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Overlay from "./Overlay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const AuthContainer = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/check-auth", {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log("Not authenticated");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsRightPanelActive(false);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      <LoginForm 
        onSwitch={() => setIsRightPanelActive(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignUpForm 
        onSwitch={() => setIsRightPanelActive(true)}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <Overlay
        onSignInClick={() => setIsRightPanelActive(false)}
        onSignUpClick={() => setIsRightPanelActive(true)}
      />
    </div>
  );
};

export default AuthContainer;