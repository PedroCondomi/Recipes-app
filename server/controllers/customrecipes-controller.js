const CustomRecipe = require("../models/custom-recipe");

const createCustomRecipe = async (req, res) => {
  try {
    const recipe = await CustomRecipe.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: `Could not create recipe: ${error}` });
  }
};

const getUserCustomRecipes = async (req, res) => {
  const userId = req.user._id;
  try {
    const recipes = await CustomRecipe.find({ createdBy: userId });
    res.status(200).json({ "custom recipes": recipes });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not get custom recipes: ${error}` });
  }
};

const getCustomRecipeById = async (req, res) => {
  const userId = req.user._id;
  try {
    const recipe = await CustomRecipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: `Recipe not found` });
    }

    if (!recipe.createdBy.equals(userId)) {
      return res.status(403).json({ error: `Access denied` });
    }

    res.status(200).json(recipe);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not get custom recipe: ${error}` });
  }
};

const updateCustomRecipe = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const recipe = await CustomRecipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: `Recipe not found` });
    }
    if (!recipe.createdBy.equals(userId)) {
      return res.status(403).json({ error: `Access denied` });
    }

    const updatedRecipe = await CustomRecipe.findByIdAndUpdate(
      recipeId,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: `Could not update recipe: ${error}` });
  }
};

const deleteCustomRecipe = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const recipe = await CustomRecipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: `Recipe not found` });
    }

    if (!recipe.createdBy.equals(userId)) {
      return res.status(403).json({ error: `Access denied` });
    }

    await CustomRecipe.findByIdAndDelete(recipeId);

    res.status(200).json({ message: "Recipe deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not get custom recipe: ${error}` });
  }
};

module.exports = {
  createCustomRecipe,
  getCustomRecipeById,
  getUserCustomRecipes,
  updateCustomRecipe,
  deleteCustomRecipe,
};
