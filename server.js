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
  console.log({ authorizationUrl });
  res.json({ authorizationUrl });
});

// OAuth Redirect endpoint
app.get("/oauth/redirect", async (req, res) => {
  const authCode = req.query.code;
  console.log({ authCode });
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

      // Store the token and redirect
      tokenStore[response.data.access_token] = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
      };

      // Redirect to a secure page or display a success message
      res.redirect("/dashboard");
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

// System Summary endpoint
app.get("/api/system-summary", async (req, res) => {
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

    const response = await axios.get(
      `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?end_at=${now}`,
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

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const path = require("path");
// const querystring = require("querystring");

// const app = express();
// const port = process.env.PORT || 3001;

// const tokenStore = {};

// app.use(express.json());
// app.use(cors());

// // In your Express server file
// app.get("/initiate-oauth", (req, res) => {
//   const clientId = "192ef4c2b2f65ae0e67eb93eb402e430";
//   const redirectUri =
//     "https://endashpl-9db148c0dbc8.herokuapp.com/oauth/redirect";

//   const authorizationUrl = `https://api.enphaseenergy.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
//   console.log({ authorizationUrl });
//   res.json({ authorizationUrl });
// });

// // OAuth Redirect endpoint

// app.get("/oauth/redirect", async (req, res) => {
//   const authCode = req.query.code;
//   console.log({ authCode });
//   const redirectUri =
//     "https://endashpl-9db148c0dbc8.herokuapp.com/oauth/redirect";

//   if (authCode) {
//     try {
//       // URL-encode the body parameters
//       const requestBody = querystring.stringify({
//         grant_type: "authorization_code",
//         code: authCode,
//         redirect_uri: redirectUri,
//       });

//       // Exchange the authorization code for an access token
//       const response = await axios.post(
//         "https://api.enphaseenergy.com/oauth/token",
//         requestBody,
//         {
//           headers: {
//             Authorization: `Basic ${process.env.REACT_APP_BASE_64}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       // Process the response
//       console.log("Access Token Response:", response.data);
//       res.send(response.data);
//     } catch (error) {
//       console.error(
//         "Error:",
//         error.response ? error.response.data : error.message
//       );
//       res.status(500).send("Error during token exchange");
//     }
//   } else {
//     res.status(400).send("Authorization code not provided");
//   }
// });

// // System Summary endpoint
// app.get("/api/system-summary", async (req, res) => {
//   try {
//     const end_at = req.query.end_at;
//     const currentTime = new Date();
//     console.log("Current Server Time:", currentTime.toUTCString());

//     const currentEpochTime = Math.floor(currentTime.getTime() / 1000);
//     console.log("Current Server Time (Epoch):", currentEpochTime);

//     const accessToken = req.query.code;
//     const storedCode = tokenStore[accessToken];

//     if (!storedCode) {
//       throw new Error("Authorization code not found");
//     }

//     const sysId = process.env.REACT_APP_SYSTEMID;
//     const key = process.env.REACT_APP_API_KEY;

//     const response = await axios.get(
//       `https://api.enphaseenergy.com/api/v4/systems/${sysId}/telemetry/production_micro?end_at=${currentEpochTime}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           key: key,
//         },
//       }
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching system summary:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/build/index.html"));
// });
// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
