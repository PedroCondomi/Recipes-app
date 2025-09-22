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

router.post("/custom", createCustomRecipe);
router.get("/custom", getUserCustomRecipes);
router.get("/custom/:id", getCustomRecipeById);
router.put("/custom/:id", updateCustomRecipe);
router.delete("/custom/:id", deleteCustomRecipe);

module.exports = router;
