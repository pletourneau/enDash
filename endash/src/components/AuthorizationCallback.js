// AuthorizationCallback.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { exchangeAuthorizationCode } from "../api/api";

const AuthorizationCallback = () => {
  const navigate = useNavigate();
  const [authorizationCode, setAuthorizationCode] = useState("");

  const handleCodeInputChange = (e) => {
    setAuthorizationCode(e.target.value);
  };

  const handleTokenExchange = () => {
    console.log("Authorization Code before exchange:", authorizationCode);
    if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode)
        .then((accessToken) => {
          console.log("Access token received:", accessToken);
          // Store the access token as needed (e.g., in localStorage)
          localStorage.setItem("access_token", accessToken);

          // Redirect to the dashboard or any other route
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error exchanging authorization code:", error);
          // Handle the error
        });
    } else {
      console.error("Authorization code is empty.");
    }
  };

  return (
    <div>
      <h2>Authorization Callback</h2>
      <div>
        <label>
          Enter Authorization Code:
          <input
            type="text"
            value={authorizationCode}
            onChange={handleCodeInputChange}
          />
        </label>
      </div>
      <button onClick={handleTokenExchange}>Exchange Authorization Code</button>
    </div>
  );
};

export default AuthorizationCallback;
