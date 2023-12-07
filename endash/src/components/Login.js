// components/Login.js
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Load environment variables from .env file
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const authUri = process.env.REACT_APP_AUTH_URI;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
