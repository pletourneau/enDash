const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
// New route handler for /start-oauth-flow
app.get("/start-oauth-flow", (req, res) => {
  // Enphase Energy's authorization URL
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}`;
  // OAuth parameters
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  // Redirect the user to Enphase Energy's authorization URL
  const redirectUrl = `${authorizationUrl}&response_type=code&redirect_uri=${redirectUri}`;
  res.redirect(redirectUrl);
});

// OAuth token exchange endpoint
app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  try {
    const response = await axios.post(
      "https://api.enphaseenergy.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
