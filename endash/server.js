// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

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
    console.log(authHeader);
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

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
