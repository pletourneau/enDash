// components/Login.js
import React from "react";
import axios from "axios";

// const exp = localStorage.getItem("expires_at");
// console.log(exp);
// const now = Math.floor(Date.now() / 1000);
// console.log(now);
const Login = () => {
  const handleLogin = async () => {
    try {
      // Make a request to the server to initiate the OAuth flow
      const response = await axios.get("/initiate-oauth");
      console.log(response);
      // Redirect the user to the authorization URL provided by the server
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      console.error("Error initiating OAuth flow:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
