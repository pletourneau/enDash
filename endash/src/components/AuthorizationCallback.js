// components/AuthorizationCallback.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { exchangeAuthorizationCode } from "../api/api";

const AuthorizationCallback = () => {
  console.log("Rendering AuthorizationCallback...");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authorizationCode = searchParams.get("code");
    console.log(authorizationCode);

    if (authorizationCode) {
      console.log("Authorization code found:", authorizationCode);
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
      console.error("Authorization code not found in the URL.");
    }
  }, [location.search, navigate]);

  return <div>Handling OAuth Callback...</div>;
};

export default AuthorizationCallback;
