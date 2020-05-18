require("dotenv").config();

const cookies_options = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: true // Indicates if the cookie should be signed
};

const session_options = {
  cookieName: "session", // the cookie key name
  secret: process.env.COOKIE_SECRET, // the encryption key
  duration: 20 * 1000, // expired after 20 sec
  activeDuration: 0, // if expiresIn < activeDuration,
  //the session will be extended by activeDuration milliseconds
  cookie: cookies_options
  // cookieName: "session",
  // secret: "eg[isfd-8yF9-7w2315df{}+Ijsli;;to8",
  // duration: 30 * 60 * 1000,
  // activeDuration: 5 * 60 * 1000,
  // httpOnly: true,
  // secure: true,
  // ephemeral: true,
  // cookies_options: cookies_options
};

module.exports = { session_options, cookies_options };
