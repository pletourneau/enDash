const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
// New route handler for /start-oauth-flow
// app.get("/start-oauth-flow", (req, res) => {
//   // Enphase Energy's authorization URL
//   const clientId = process.env.REACT_APP_CLIENT_ID;
//   const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}`;
//   // OAuth parameters
//   const redirectUri = process.env.REACT_APP_REDIRECT_URI;

//   // Redirect the user to Enphase Energy's authorization URL
//   const redirectUrl = `${authorizationUrl}&response_type=code&redirect_uri=${redirectUri}`;
//   res.redirect(redirectUrl);
// });

const querystring = require("querystring");
// OAuth token exchange endpoint
app.post("/oauth/token", async (req, res) => {
  const { code } = req.body;
  console.log("Authorization Code:", code);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  try {
    console.log("Token Exchange Request:", {
      method: "post",
      url: "https://api.enphaseenergy.com/oauth/token",
      data: querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const response = await axios.post(
      "https://api.enphaseenergy.com/oauth/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
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
