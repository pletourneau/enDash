// AuthorizationCallback.js

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeAuthorizationCode } from "../api/api";
// import Dashboard from "./Dashboard";

const AuthorizationCallback = () => {
  console.log("Rendering AuthorizationCallback...");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenExchange = async (authorizationCode) => {
      try {
        console.log("Exchanging authorization code for access token...");

        // Call the function to exchange authorization code for access token
        const tokenResponse = await exchangeAuthorizationCode(
          authorizationCode
        );

        // Handle the access token, refresh token, etc.
        console.log("Access Token Response:", tokenResponse);
        localStorage.setItem("access_token", tokenResponse.access_token);
        localStorage.setItem("refresh_token", tokenResponse.refresh_token);

        navigate("/dashboard");
        // Now you can redirect or perform other actions based on the token response
      } catch (error) {
        console.error("Token Exchange Error:", error);
        // Handle errors
      }
    };

    const searchParams = new URLSearchParams(location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log("Authorization code found:", authorizationCode);
      // Call the function to exchange authorization code for access token
      handleTokenExchange(authorizationCode);
    } else {
      console.error("Authorization code not found in the URL.");
    }
  }, [location.search, navigate]);

  return <div>Handling OAuth Callback...</div>;
};

export default AuthorizationCallback;
