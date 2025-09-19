const {
  getRecipeById,
  getRecipeByName,
  getRandomRecipe,
  addFavorite,
  deleteFavorite,
  getFavorites,
} = require("../controllers/recipes-controller");
const { Router } = require("express");
const verifyAuth = require("../middlewares/googleauth");

const router = Router();

// Single recipes
router.get("/search", [verifyAuth], getRecipeByName);
router.get("/meal/random", getRandomRecipe);
router.get("/meal/:id", getRecipeById);

// Grouped recipes
// router.get("/categories", getRecipeById);
// router.get("/areas", getRecipeById);
// router.get("/ingredients", getRecipeById);

// Filter recipes
// router.get("/meals/filter?category=Seafood", getRecipeById);
// router.get("/meals/filter?area=Canadian", getRecipeById);
// router.get("/meals/filter?ingredient=chicken_breast", getRecipeById);

// Misc search
// router.get("/ingredients/:name", getRecipeById);
// router.get("/meals/search?firstLetter=a", getRecipeById);

router.post("/favorites/:id", [verifyAuth], addFavorite);
router.delete("/favorites/:id", [verifyAuth], deleteFavorite);
router.get("/favorites", [verifyAuth], getFavorites);
router.get("/favorites/:id", [verifyAuth], getRecipeById);

module.exports = router;
