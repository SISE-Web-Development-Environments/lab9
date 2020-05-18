require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json

const { session_options } = require("./modules/config");
// app.use(cookieParser(process.env.COOKIE_SECRET, cookies_options)); //Parse the cookies into the req.cookies
const session = require("client-sessions");

app.use(session(session_options));

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

var port = process.env.PORT || "3000";
//#endregion
const user = require("./routes/user");
const profile = require("./routes/profile");
const recipes = require("./routes/recipes");

//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM dbo.users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = user_id;
          // req.session.user_id = user_id; //refresh the session value
          // res.locals.user_id = user_id;
        }
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});
//#endregion

app.get("/", (req, res) => res.send("welcome"));

app.use("/user", user);
app.use("/profile", profile);
app.use("/recipes", recipes);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
