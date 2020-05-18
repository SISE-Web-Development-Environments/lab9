require("dotenv").config();

const cookies_options = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: true // Indicates if the cookie should be signed
};

const session_options = {
  cookieName: "session", // the cookie key name
  secret: process.env.COOKIE_SECRET, // the encryption key
  duration: 30 * 60 * 1000, // expired after 20 sec
  activeDuration: 5 * 60 * 1000 // if expiresIn < activeDuration,
  //the session will be extended by activeDuration milliseconds
  // cookie: cookies_options
};

module.exports = { session_options, cookies_options };
