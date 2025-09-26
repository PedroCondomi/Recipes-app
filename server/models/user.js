const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  mealId: { type: String, required: true },
  name: String,
  thumbnail: String,
});

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: String,
  email: String,
  image: String,
  favorites: [favoriteSchema], // meal IDs from TheMealDB
  groceryList: [String], // Ingredients or custom list
});

module.exports = mongoose.model("User", userSchema);
