const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());

// New route handler for /start-oauth-flow
app.get("/start-oauth-flow", (req, res) => {
  // Enphase Energy's authorization URL
  const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}`;
  // OAuth parameters
  const clientId = process.env.clientId;
  const redirectUri = process.env.redirectUri;
  const responseType = "code";

  // Redirect the user to Enphase Energy's authorization URL
  const redirectUrl = `${authorizationUrl}&response_type=${responseType}&redirect_uri=${redirectUri}`;
  res.redirect(redirectUrl);
});

// OAuth token exchange endpoint
app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;

  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const redirectUri = process.env.redirectUri;

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
