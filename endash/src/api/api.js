import axios from "axios";

export const exchangeAuthorizationCode = async (authorizationCode) => {
  console.log(
    "Received Authorization Code in exchangeAuthorizationCode:",
    authorizationCode
  );

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

  try {
    const response = await axios.post(
      "http://localhost:3001/oauth/token",
      null,
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

    console.log("api.js Access Token Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("api.js Access Token Request Error:", error);
    throw error;
  }
};

export const fetchDataFromAPI = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.enphaseenergy.com/some-endpoint",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};
