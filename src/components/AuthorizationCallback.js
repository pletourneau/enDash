// AuthorizationCallback.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthorizationCallback = () => {
  const navigate = useNavigate();
  const [authorizationCode, setAuthorizationCode] = useState("");

  const handleCodeInputChange = (e) => {
    setAuthorizationCode(e.target.value);
  };

  const handleTokenExchange = async () => {
    console.log("Authorization Code before exchange:", authorizationCode);

    if (authorizationCode) {
      try {
        const response = await axios.post("http://localhost:3001/oauth/token", {
          code: authorizationCode,
        });
        const accessToken = response.data.access_token;

        // console.log("Access token received:", accessToken);

        localStorage.setItem("access_token", accessToken);

        // Redirect to the dashboard or any other route
        navigate("/dashboard");
      } catch (error) {
        console.error("Error exchanging authorization code:", error);
        // Handle the error
      }
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
