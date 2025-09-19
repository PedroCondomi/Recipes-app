const mongoose = require("mongoose");

const CustomRecipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ingredients: [{ name: String, amount: String }],
    instructions: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomRecipe", CustomRecipeSchema);
