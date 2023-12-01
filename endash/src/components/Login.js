//Login.js

import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Replace "your_actual_client_id" with your Enphase Energy client ID
    const clientId = "192ef4c2b2f65ae0e67eb93eb402e430";

    // Replace "http://localhost:3000/callback" with your actual redirect URI
    const redirectUri = encodeURIComponent("http://localhost:3000/callback");

    // Construct the authorization URL with the hardcoded values
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
