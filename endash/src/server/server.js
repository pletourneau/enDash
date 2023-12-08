// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;
  console.log("Authorization Code:", code);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  // const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const redirectUri = "https://api.enphaseenergy.com/oauth/redirect_uri";
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const authHeader = `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64")}`;

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

    console.log("Token Exchange Response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
