//Login.js

import React from "react";

const Login = () => {
  const handleLogin = () => {
    // Redirect the user to the server endpoint that initiates the OAuth flow
    window.location.href = "http://localhost:5000/start-oauth-flow";
  };
  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
