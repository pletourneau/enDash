//Login.js

import React from "react";
// import { useHistory } from "react-router-dom";

const Login = () => {
  // const history = useHistory();

  const handleLogin = () => {
    // const oauthAuthUrl = process.env.authorizationUrl;
    window.location.href =
      "https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=192ef4c2b2f65ae0e67eb93eb402e430&redirect_uri=http://localhost:3000/src/components/AuthorizationCallback";
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
