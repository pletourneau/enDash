const express = require("express");
const axios = require("axios");
require("dotenv").config(); // If you are using environment variables

const app = express();
const port = 3001; // Adjust the port as needed

app.use(express.json());

// OAuth token exchange endpoint
app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is required" });
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await exchangeAuthorizationCode(code);

    // Store the access token securely (you might use a database or environment variable)
    const accessToken = tokenResponse.access_token;

    // Perform any additional logic (e.g., store in a database)

    res.status(200).json({ message: "Token exchange successful", accessToken });
  } catch (error) {
    console.error("Token Exchange Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Axios request to exchange authorization code for access token
const exchangeAuthorizationCode = async (code) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  const tokenEndpoint = "https://api.enphaseenergy.com/oauth/token";

  try {
    const response = await axios.post(tokenEndpoint, {
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
