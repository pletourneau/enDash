// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

const tokenStore = {};

app.use(express.json());
app.use(cors());

app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;
  console.log("Authorization Code:", code);

  const base64 = process.env.REACT_APP_BASE_64;
  const redirectUri = "https://api.enphaseenergy.com/oauth/redirect_uri";
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const authHeader = `Basic ${base64}`;

    console.log("Authorization Header:", authHeader);
    const response = await axios.post(
      "https://api.enphaseenergy.com/oauth/token",
      params.toString(),
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;

    tokenStore[code] = accessToken;
    console.log(accessToken);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/system-summary", async (req, res) => {
  try {
    const systemId = process.env.REACT_APP_SYSTEMID;
    const code = req.query.code;

    if (!code) {
      throw new Error("Authorization code not provided");
    }

    const accessToken = tokenStore[code];
    console.log(accessToken);

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await axios.get(
      `https://api.enphaseenergy.com/api/V4/systems/${systemId}/summary`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching system summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
