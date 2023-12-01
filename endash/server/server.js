// server.js (or wherever your server logic is)

const express = require("express");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const { exchangeAuthorizationCode } = require("../api/api");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  session({
    secret: process.env.clientSecret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());

passport.use(
  "oauth2",
  new OAuth2Strategy(
    {
      authorizationURL: "OAuth-provider-authorization-url",
      tokenURL: "OAuth-provider-token-url",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      redirectURI: process.env.redirectURI,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        accessToken,
        refreshToken,
        profile,
      };
      // Handle user authentication and store user data in session or database
      // 'profile' typically contains user information returned by the OAuth provider
      return done(null, profile);
    }
  )
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes for authentication
app.get(
  "/auth/callback",
  passport.authenticate("oauth2", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      // Extract the authorization code from the query parameters
      const authorizationCode = req.query.code;

      // Call the function to exchange authorization code for access token
      const tokenResponse = await exchangeAuthorizationCode(authorizationCode);

      // Handle tokenResponse as needed (store tokens, etc.)
      res.redirect("/"); // Redirect to the home page or another suitable destination
    } catch (error) {
      console.error("Token Exchange Error:", error);
      res.status(500).json({ error: "Token exchange failed." });
    }
  }
);

app.get("/logout", (req, res) => {
  // Use the req.logout() function provided by Passport to log the user out
  req.logout();

  // Redirect the user to the home page or another suitable destination
  res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
