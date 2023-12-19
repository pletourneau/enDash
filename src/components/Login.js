// components/Login.js
import React from "react";
import axios from "axios";

const Login = () => {
  // Retrieve the expiration time from localStorage
  const exp = parseInt(localStorage.getItem("expires_at"), 10);
  const now = Math.floor(Date.now() / 1000);
  const expRef = parseInt((localStorage.getItem("expires_at"), 10) + 2629700);

  // Redirect to the dashboard if the token hasn't expired yet
  if (now < exp) {
    window.location.href = "/dashboard";
    return null;
  }
  // } else if (now < expRef) {
  //   const refreshToken = localStorage.getItem("refresh_token");
  //   axios
  //     .post("/refresh-token", { refreshToken })
  //     .then((response) => {
  //       localStorage.setItem("access_token", response.data.accessToken);
  //       localStorage.setItem("refresh_token", response.data.refreshToken);
  //       localStorage.setItem("expires_at", response.data.expiresAt);
  //       window.location.href = "/dashboard";
  //     })
  //     .catch((error) => {
  //       console.error("Error refreshing token:", error);
  //       // Proceed to show login button
  //     });
  //   return;
  // }
  // If neither token is valid, show login button

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
