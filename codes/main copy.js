require("dotenv").config();
//#region express configures
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
const cookies_options = require("./cookies.config");
app.use(cookieParser(process.env.COOKIE_SECRET, cookies_options)); //Parse the cookies into the req.cookies
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

var port = process.env.PORT || "3000";
//#endregion
//#region global imports
const users = require("./routes/users");
//#endregion

app.use("/users", users);

router.get("/recipes/getRecipe", async (req, res) => {
  const recipe = await axios.get(
    `https://api.spoonacular.com/recipes/${req.query.id}/information`,
    {
      params: {
        includeNutrition: false,
        apiKey: process.env.spooncular_apiKey
      }
    }
  );
  res.send({ data: recipe.data });
});

router.get("/recipes/search", async (req, res) => {});

router.get("/recipes/addRecipe", async (req, res) => {});

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
