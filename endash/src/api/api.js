//api.js

import axios from "axios";

export const exchangeAuthorizationCode = async (authorizationCode) => {
  console.log("Exchanging authorization code:", authorizationCode);
  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const redirectUri = process.env.redirectUri;

  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

  try {
    const response = await axios.post(
      "https://api.enphaseenergy.com/oauth/token",
      null, // Pass null as the request body since parameters are sent in the URL
      {
        params: {
          grant_type: "authorization_code",
          code: authorizationCode,
          redirect_uri: redirectUri,
        },
        headers: {
          Authorization: authHeader,
        },
      }
    );
    console.log("Access Token Response:", response.data, response);

    return response.data;
  } catch (error) {
    console.error("Access Token Request Error:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
