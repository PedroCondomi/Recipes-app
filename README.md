# Recipes App

A modern web application for discovering, saving, and creating recipes using TheMealDB API. Users can search for recipes, view details, save favorites, and create custom recipes.

---

## Features

- **Search Recipes**: Find recipes by name or get a random recipe.
- **Recipe Details**: View full recipe information including ingredients and instructions.
- **Google Login**: Securely log in with your Google account.
- **Favorites**: Save your favorite recipes for easy access.
- **Custom Recipes**: Create, edit, and delete your own custom recipes.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PedroCondomi/Recipes-app
   ```
2. Configure environment variables (e.g., MongoDB URI, Google OAuth credentials).
3. Start the app:
   ```bash
   npm run start
   ```
4. Open localhost:8080 in your browser to access the frontend.

# Usage

## Search Recipes

- Use the search bar to find recipes by name.
- Click Random recipe to discover a random dish.

## View Recipe Details

- Click on any recipe card to see full details including ingredients, measures, and instructions.

## Favorites

- Log in with Google to save recipes as favorites.
- Click the bookmark icon on any recipe detail to add/remove it from favorites.

## Custom Recipes

- Go to Custom Recipes to create a new recipe.
- Add a title, instructions, and ingredients.
- Edit or delete recipes as needed.

# Technologies

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node, Express, MongoDB, Axios, JWT
- **Authentication**: Passport (Google OAuth)
- **API Integration**: TheMealDB API
