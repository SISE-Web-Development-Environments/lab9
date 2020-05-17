var express = require("express");
var router = express.Router();
const axios = require("axios");
const DButils = require("../DButils");

const api_domain = "https://api.spoonacular.com/recipes";

router.get("/Information", async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
});

//#region task1 - make serach endpoint
router.get("/search", async (req, res, next) => {
  try {
    const { query, cuisine, diet, intolerances, number } = req.query;
    const search_response = await axios.get(`${api_domain}/search`, {
      params: {
        query: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
        number: number,
        instructionsRequired: true,
        apiKey: process.env.spooncular_apiKey
      }
    });
    let recipes = await Promise.all(
      search_response.data.results.map((recipe_raw) =>
        getRecipeInfo(recipe_raw.id)
      )
    );
    recipes = recipes.map((recipe) => recipe.data);
    res.send({ data: recipes });
  } catch (error) {
    next(error);
  }
});

router.use("/add", (req, res, next) => {
  const { cookie } = req.body.cookie;

  if (!cookie.valid) {
    DButils.execQuery("SELECT username FROM dbo.users");
    ////
  } else {
    next();
  }
});

router.get("/add", async (req, res) => {});

function getRecipeInfo(id) {
  return axios.get(`${api_domain}/${id}/information`, {
    params: {
      includeNutrition: false,
      apiKey: process.env.spooncular_apiKey
    }
  });
}
//#endregion

module.exports = router;
