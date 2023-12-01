// components/AuthorizationCallback.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthorizationCallback = () => {
  console.log("Rendering AuthorizationCallback...");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log("Authorization code found:", authorizationCode);
      // The server will handle the OAuth flow and redirect to the callback
    } else {
      console.error("Authorization code not found in the URL.");
    }
  }, [location.search, navigate]);

  return <div>Handling OAuth Callback...</div>;
};

export default AuthorizationCallback;
