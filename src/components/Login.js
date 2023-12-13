// components/Login.js
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Load environment variables from .env file
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;
    console.log(redirectUri);

    // Construct the authorization URL
    const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    console.log("Authorization URL:", authorizationUrl);
    // Redirect the user to the authorization URL
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
