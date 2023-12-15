// components/Login.js
import React from "react";
import axios from "axios";

const Login = () => {
  const accessToken = localStorage.getItem("access_token");
  const now = Math.floor(Date.now() / 1000);
  const exp = localStorage.getItem("expires_at");
  console.log(exp);
  const handleLogin = async () => {
    if (now < exp) {
      const [setData] = useState(null);
      const response = await axios.get("/api/system-summary", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: process.env.REACT_APP_API_KEY,
        },
        params: {
          end_at: now,
        },
      });
      setData(response.data);
    } else {
      try {
        // Make a request to the server to initiate the OAuth flow
        const response = await axios.get("/initiate-oauth");
        console.log(response);
        // Redirect the user to the authorization URL provided by the server
        window.location.href = response.data.authorizationUrl;
      } catch (error) {
        console.error("Error initiating OAuth flow:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
};

export default Login;
