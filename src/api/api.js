// // api.js
// import axios from "axios";

// export const exchangeAuthorizationCode = async (authorizationCode) => {
//   console.log(
//     "Received Authorization Code in exchangeAuthorizationCode:",
//     authorizationCode
//   );

//   try {
//     const response = await axios.post(
//       "https://api.enphaseenergy.com/oauth/token",
//       { code: authorizationCode }
//     );

//     console.log("api.js Access Token Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("api.js Access Token Request Error:", error);
//     throw error;
//   }
// };

// export const fetchDataFromAPI = async (accessToken) => {
//   try {
//     const response = await axios.get(
//       "https://api.enphaseenergy.com/some-endpoint",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//     throw error;
//   }
// };
