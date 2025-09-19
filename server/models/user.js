const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: String,
  email: String,
  image: String,
  favorites: [String], // meal IDs from TheMealDB
  groceryList: [String], // Ingredients or custom list
});

module.exports = mongoose.model("User", userSchema);
