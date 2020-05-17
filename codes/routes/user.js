var express = require("express");
var router = express.Router();
const DButils = require("../DButils");
const CryptoJS = require("crypto-js");
const { RegisterValidationRules, validate } = require("../validator");
const cookies_options = require("../cookies.config");

router.post(
  "/Register",
  RegisterValidationRules,
  validate,
  async (req, res, next) => {
    try {
      // parameters exists
      // valid parameters
      // username exists
      const users = await DButils.execQuery("SELECT username FROM dbo.users");

      if (users.find((x) => x.username === req.body.username))
        throw { status: 409, message: "Username taken" };

      // add the new username
      let hash_password = CryptoJS.SHA3(req.body.password).toString(
        CryptoJS.enc.Base64
      );
      await DButils.execQuery(
        `INSERT INTO dbo.users (username, password) VALUES ('${req.body.username}', '${hash_password}')`
      );
      res.status(201).send({ message: "user created", success: true });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DButils.execQuery("SELECT username FROM dbo.users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DButils.execQuery(
        `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
      )
    )[0];
    let hash_password = CryptoJS.SHA3(req.body.password).toString(
      CryptoJS.enc.Base64
    );
    if (hash_password !== user.password) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    res.cookie("cookieName", "cookieValue", cookies_options); // options is optional

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
