//server/server.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());

// New route handler for /start-oauth-flow
app.get("/start-oauth-flow", (req, res) => {
  // Enphase Energy's authorization URL
  const authorizationUrl =
    "https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=your_client_id";
  // OAuth parameters
  const clientId = process.env.clientId;
  const redirectUri = process.env.redirectUri;
  const responseType = "code";

  // Redirect the user to Enphase Energy's authorization URL
  const redirectUrl = `${authorizationUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}`;
  res.redirect(redirectUrl);
});

// OAuth token exchange endpoint
app.post("/oauth/token", async (req, res) => {});

// Axios request to exchange authorization code for access token
const exchangeAuthorizationCode = async (code) => {
  // The existing code for exchanging authorization code remains unchanged
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
