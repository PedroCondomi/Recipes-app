const axios = require("axios");
const baseUrl = "https://www.themealdb.com/api/json/v1/1";
const User = require("../models/user");

// GET functions
const getRecipeByName = async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({
      error: "Missing search query",
    });
  }

  try {
    const response = await axios.get(`${baseUrl}/search.php?s=${query}`);
    const meals = response.data.meals || [];
    res.status(200).json({ meals });
  } catch (error) {
    return res.status(500).json({
      error: `Error ferching meals: ${error}`,
    });
  }
};

const getRecipeById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      error: "Missing search id",
    });
  }

  try {
    const response = await axios.get(`${baseUrl}/lookup.php?i=${id}`);
    const meal = response.data.meals?.[0];
    if (!meal) {
      return res.status(404).json({
        error: "Meal not found",
      });
    }
    res.status(200).json({ meal });
  } catch (error) {
    return res.status(500).json({
      error: `Error ferching meal: ${error}`,
    });
  }
};

// const getRecipeByIngredient = () => {};

const getRandomRecipe = async (req, res) => {
  try {
    const response = await axios.get(`${baseUrl}/random.php`);
    const meal = response.data.meals;
    res.status(200).json({ meal });
  } catch (error) {
    return res.status(500).json({
      error: `Error ferching random meal: ${error}`,
    });
  }
};

const getFavorites = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not get favorite recipes: ${error}` });
  }
};

// const getRecipeByArea = () => {};
// const getRecipeByCategory = () => {};

// POST functions
const addFavorite = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const already = user.favorites.find(f => f.mealId === recipeId);
    if (already) {
      return res.status(400).json({ error: "Recipe already in favorites" });
    }

    const response = await axios.get(`${baseUrl}/lookup.php?i=${recipeId}`);
    const meal = response.data.meals?.[0];
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    user.favorites.push({
      mealId: meal.idMeal,
      name: meal.strMeal,
      thumbnail: `${meal.strMealThumb}/preview`,
    });

    await user.save();

    res.status(200).json({
      message: "Recipe added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not add recipe to favorites: ${error}` });
  }
};

// DELETE functions
const deleteFavorite = async (req, res) => {
  const userId = req.user._id;
  const recipeId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.favorites = user.favorites.filter(f => f.mealId !== recipeId);
    await user.save();

    res.status(200).json({
      message: "Recipe removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Could not remove recipe from favorites: ${error}` });
  }
};

module.exports = {
  getRecipeByName,
  getRecipeById,
  getRandomRecipe,
  addFavorite,
  deleteFavorite,
  getFavorites,
};
