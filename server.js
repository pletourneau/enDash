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
    // Set up query parameters
    const threeDaysAgo = Math.floor(Date.now() / 1000) - 3 * 24 * 60 * 60; // Six days ago in seconds
    console.log(threeDaysAgo);
    const start_at = req.query.start_at || threeDaysAgo;
    // const end_at = req.query.end_at || Math.floor(Date.now() / 1000);

    const accessToken = req.query.code;
    const storedCode = tokenStore[accessToken];

    if (!storedCode) {
      throw new Error("Authorization code not found");
    }
    const sysId = process.env.REACT_APP_SYSTEMID;
    const key = process.env.REACT_APP_API_KEY;

    const response = await axios.get(
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?start_at=${start_at}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          key: key,
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching rgm_stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//NOT CURRENTLY FUNCTIONING. is it the key part of the path? cant tell from documentation

// app.get("/api/system-summary", async (req, res) => {
//   try {
//     const key = process.env.REACT_APP_API_KEY;
//     const sysId = process.env.REACT_APP_SYSTEMID;
//     console.log(key);
//     console.log(sysId);
//     const accessToken = req.query.code;
//     const storedCode = tokenStore[accessToken];
//     // console.log(accessToken); //verified this is correct
//     if (!storedCode) {
//       throw new Error("Authorization code not found");
//     }

//     const response = await axios.get(
//       // `https://api.enphaseenergy.com/api/v4/systems/${sysId}/?key=${key}`, functional

//       // `https://api.enphaseenergy.com//api/v4/systems/${sys_id}/telemetry/production_micro/?key=${key}`, NOT FUNCTIONAL

//       // `https://api.enphaseenergy.com/api/v4/systems/${sysId}/devices?key=${key}`,
//       // functional device summary above. see notes for output. NOT USEFUL unless active=true becomes useful

//       `https://api.enphaseenergy.com/api/v4/systems/${sysId}/summary?key=${key}`,
//       // functional summary above. the other endpoints arent useful or dont function.

//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     console.log(response);
//     console.log("Enphase API Response:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
