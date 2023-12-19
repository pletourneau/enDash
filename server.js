require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const querystring = require("querystring");

const app = express();
const port = process.env.PORT || 3001;

const tokenStore = {};

app.use(express.json());
app.use(cors());

// In your Express server file
app.get("/initiate-oauth", (req, res) => {
  const clientId = "192ef4c2b2f65ae0e67eb93eb402e430";
  const redirectUri =
    "https://endashpl-9db148c0dbc8.herokuapp.com/oauth/redirect";

  const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  // console.log({ authorizationUrl });
  res.json({ authorizationUrl });
});

// OAuth Redirect endpoint
app.get("/oauth/redirect", async (req, res) => {
  const authCode = req.query.code;
  // console.log({ authCode });
  const redirectUri =
    "https://endashpl-9db148c0dbc8.herokuapp.com/oauth/redirect";

  if (authCode) {
    try {
      // URL-encode the body parameters
      const requestBody = querystring.stringify({
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: redirectUri,
      });

      // Exchange the authorization code for an access token
      const response = await axios.post(
        "https://api.enphaseenergy.com/oauth/token",
        requestBody,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_BASE_64}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const expiresIn = parseInt(response.data.expires_in, 10); // Make sure to parse it as an integer
      const expiresAt = Date.now() + expiresIn * 1000; // Convert expiresIn to milliseconds and add to current time

      // Store the token and redirect
      tokenStore[response.data.access_token] = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: expiresAt,
      };
      console.log(tokenStore[response.data.access_token].accessToken);
      console.log(tokenStore[response.data.access_token].expiresAt);
      // Redirect to a secure page or display a success message
      // res.redirect("/dashboard");
      res.redirect(
        `/dashboard?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}&expires_at=${expiresAt}`
      );
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error during token exchange");
    }
  } else {
    res.status(400).send("Authorization code not provided");
  }
});

//refresh token exchange
app.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  try {
    const requestBody = querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const response = await axios.post(
      "https://api.enphaseenergy.com/oauth/token",
      requestBody,
      {
        headers: {
          Authorization: `Basic ${process.env.REACT_APP_BASE_64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const expiresIn = parseInt(response.data.expires_in, 10);
    const expiresAt = Date.now() + expiresIn * 1000;

    res.json({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresAt: expiresAt,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).send("Error during token refresh");
  }
});
// System endpoints
app.get("/api/micros-telemetry", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];
    console.log({ accessToken });

    if (!accessToken) {
      return res.status(401).send("Access Token is required");
    }

    const sysId = process.env.REACT_APP_SYSTEMID;
    const key = process.env.REACT_APP_API_KEY;
    const now = Math.floor(new Date().getTime() / 1000);

    const telemetryResponse = await axios.get(
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?end_at=${now}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: key,
        },
      }
    );

    const summaryResponse = await axios.get(
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/summary`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: key,
        },
      }
    );

    const combinedResponse = {
      telemetry: telemetryResponse.data,
      summary: summaryResponse.data,
    };

    res.json(combinedResponse);
  } catch (error) {
    console.error("Error fetching system summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
