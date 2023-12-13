require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

const tokenStore = {};

app.use(express.json());
app.use(cors());

// In your Express server file
app.get("/initiate-oauth", (req, res) => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  res.json({ authorizationUrl });
});

// OAuth Redirect endpoint
app.get("/oauth/redirect", async (req, res) => {
  const authCode = req.query.code;
  const redirectUri =
    "https://endashpl-9db148c0dbc8.herokuapp.com/oauth/redirect";

  if (authCode) {
    try {
      // Exchange the authorization code for an access token
      const response = await axios.post(
        "https://api.enphaseenergy.com/oauth/token",
        {
          grant_type: "authorization_code",
          code: authCode,
          redirect_uri: redirectUri,
        },
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_BASE_64}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.access_token;
      tokenStore[accessToken] = authCode;

      // Redirect to your frontend with the token or relevant info
      res.redirect(`http://localhost:3000/dashboard?token=${accessToken}`);
    } catch (error) {
      console.error("Error during token exchange:", error);
      // Redirect to an error page or handle the error
      res.redirect("http://localhost:3000/error");
    }
  } else {
    console.error("Authorization code is missing.");
    // Handle error or access denied scenario
    res.redirect("http://localhost:3000/login");
  }
});

// System Summary endpoint
app.get("/api/system-summary", async (req, res) => {
  try {
    const end_at = req.query.end_at;
    const currentTime = new Date();
    console.log("Current Server Time:", currentTime.toUTCString());

    const currentEpochTime = Math.floor(currentTime.getTime() / 1000);
    console.log("Current Server Time (Epoch):", currentEpochTime);

    const accessToken = req.query.code;
    const storedCode = tokenStore[accessToken];

    if (!storedCode) {
      throw new Error("Authorization code not found");
    }

    const sysId = process.env.REACT_APP_SYSTEMID;
    const key = process.env.REACT_APP_API_KEY;

    const response = await axios.get(
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?end_at=${currentEpochTime}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: key,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching system summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
