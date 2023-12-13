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
    const end_at = req.query.end_at;
    const currentTime = new Date();
    console.log("Current Server Time:", currentTime.toUTCString());

    // Logging current server time in Unix epoch time (seconds)
    const currentEpochTime = Math.floor(currentTime.getTime() / 1000);
    console.log("Current Server Time (Epoch):", currentEpochTime);

    // const oneDayAgo = currentEpochTime - 24 * 60 * 60;

    //max 288 responses =24hrs. Max 1 day per query

    // console.log(oneDayAgo);
    // const start_at = oneDayAgo;

    const accessToken = req.query.code;
    const storedCode = tokenStore[accessToken];

    if (!storedCode) {
      throw new Error("Authorization code not found");
    }
    const sysId = process.env.REACT_APP_SYSTEMID;
    const key = process.env.REACT_APP_API_KEY;

    const response = await axios.get(
      // `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?start_at=${start_at}&end_at=${currentEpochTime}`,
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?end_at=${currentEpochTime}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: key,
        },
      }
    );

    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching rgm_stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
