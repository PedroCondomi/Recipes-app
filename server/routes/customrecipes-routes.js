const {
  createCustomRecipe,
  getCustomRecipeById,
  getUserCustomRecipes,
  updateCustomRecipe,
  deleteCustomRecipe,
} = require("../controllers/customrecipes-controller");
const { Router } = require("express");
const verifyAuth = require("../middlewares/googleauth");

const router = Router();

// All routes verify auth
// router.use(verifyAuth);

router.post("/custom", [verifyAuth], createCustomRecipe);
router.get("/custom", [verifyAuth], getUserCustomRecipes);
router.get("/custom/:id", [verifyAuth], getCustomRecipeById);
router.put("/custom/:id", [verifyAuth], updateCustomRecipe);
router.delete("/custom/:id", [verifyAuth], deleteCustomRecipe);

module.exports = router;
