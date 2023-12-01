import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exchangeAuthorizationCode } from "../api/api";

const AuthorizationCallback = () => {
  console.log("Rendering AuthorizationCallback...");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log("Authorization code found:", authorizationCode);
      // Call the function to exchange authorization code for access token
      handleTokenExchange(authorizationCode);
    } else {
      console.error("Authorization code not found in the URL.");
    }
  }, [location.search]);

  const handleTokenExchange = async (authorizationCode) => {
    try {
      console.log("Exchanging authorization code for access token...");

      // Call the function to exchange authorization code for access token
      const tokenResponse = await exchangeAuthorizationCode(authorizationCode);

      // Handle the access token, refresh token, etc.
      console.log("Access Token Response:", tokenResponse);

      // Now you can redirect or perform other actions based on the token response
    } catch (error) {
      console.error("Token Exchange Error:", error);
      // Handle errors
    }
  };

  return <div>Handling OAuth Callback...</div>;
};

export default AuthorizationCallback;
