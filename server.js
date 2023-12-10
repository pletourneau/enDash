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
  const base64 = process.env.REACT_APP_BASE_64;
  const redirectUri = "https://api.enphaseenergy.com/oauth/redirect_uri";

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const authHeader = `Basic ${base64}`;

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
    tokenStore[accessToken] = code;

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/system-summary", async (req, res) => {
  try {
    const key = process.env.REACT_APP_API_KEY;
    const sysId = process.env.REACT_APP_SYSTEMID;
    console.log(key);
    console.log(sysId);
    const accessToken = req.query.code;
    const storedCode = tokenStore[accessToken];
    // console.log(accessToken); //verified this is correct
    if (!storedCode) {
      throw new Error("Authorization code not found");
    }

    const response = await axios.get(
      // `https://api.enphaseenergy.com/api/V4/systems/${sysId}/energy_lifetime/?key=${key}`,
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/summary?key=${key}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    console.log("Enphase API Response:", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
