var express = require("express");
var router = express.Router();
const DButils = require("../DButils");

router.use((req, res, next) => {
  const { cookie } = req.body;

  if (cookie && cookie.valid) {
    DButils.execQuery("SELECT username FROM dbo.users")
      .then((users) => {
        if (users.find((e) => e.username === cookie.username))
          req.username = cookie.username;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

router.get("/favorites", function (req, res) {
  res.send({ originalUrl: req.originalUrl, cookie_valid: req.username && 1 });
});

router.get("/personalRecipes", function (req, res) {
  res.send(req.originalUrl);
});

module.exports = router;
