// components/Login.js
import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Load environment variables from .env file
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const authUri = process.env.REACT_APP_AUTH_URI;
    // const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    const redirectUri =
      "https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=192ef4c2b2f65ae0e67eb93eb402e430&redirect_uri=https://api.enphaseenergy.com/oauth/redirect_uri";
    // const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    const authorizationUrl = redirectUri;

    console.log("clientId:", clientId);
    console.log("authUri:", authUri);
    console.log("redirectUri:", redirectUri);
    console.log("authorizationUrl:", authorizationUrl);

    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
