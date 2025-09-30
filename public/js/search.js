const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchSection = document.getElementById("search-section");
const randomBtn = document.getElementById("randomBtn");
const searchResults = document.getElementById("searchResults");
const recipeDetail = document.getElementById("recipe-detail");
const recipeContent = document.getElementById("recipeContent");
const favoritesLink = document.querySelector('[data-section="favorites"]');
const favoritesSection = document.getElementById("favorites-section");
const favoritesList = document.getElementById("favoritesList");

favoritesLink.addEventListener("click", e => {
  e.preventDefault();
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  favoritesSection.classList.remove("hidden");
  loadFavorites();
});

// favs for frontend
async function loadFavorites() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Must be logged in to see favorites");
    return;
  }
  try {
    const data = await apiGet("/favorites");
    renderFavorites(data.favorites || []);
  } catch (error) {
    favoritesList.innerHTML = `<p>Error loading favorites: ${error.message}</p>`;
  }
}

function renderFavorites(favorites) {
  if (!favorites.length) {
    favoritesList.innerHTML = "<p>No favorites saved yet.</p>";
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      fav => `
        <div class="card" onclick="loadRecipeDetail('${fav.mealId}')">
          <img src="${fav.thumbnail}" alt="${fav.name}"/>
          <h3>${fav.name}</h3>
        </div>
      `
    )
    .join("");
}

// Save user favs
let favoriteIds = new Set();

// favs ids in localstorage
async function loadFavoritesIds() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const data = await apiGet("/favorites");
    favoriteIds = new Set(data.favorites.map(f => f.mealId)); // favs IDs
  } catch (error) {
    console.error("Couldn't load favorites: ", error);
  }
}

// Search by name
searchBtn.addEventListener("click", async () => {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  searchSection.classList.remove("hidden");
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const data = await apiGet(`/search?query=${query}`);
    renderSearchResults(data.meals || []);
  } catch (error) {
    searchResults.innerHTML = `<p>Search error: ${error.message}</p>`;
  }
});

// Random recipe
randomBtn.addEventListener("click", async () => {
  try {
    const data = await apiGet("/meal/random");
    renderSearchResults(data.meal || []);
  } catch (error) {
    searchResults.innerHTML = `<p>Random search error: ${error.message}</p>`;
  }
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  searchSection.classList.remove("hidden");
});

// Renderizar resultados
function renderSearchResults(meals) {
  if (!meals.length) {
    searchResults.innerHTML = "<h2>No recipes found.</h2>";
    return;
  }

  searchResults.innerHTML = meals
    .map(
      meal => `
    <div class="card" onclick="loadRecipeDetail('${meal.idMeal}')">
      <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}"/>
      <h3>${meal.strMeal}</h3>
    </div>
  `
    )
    .join("");
}

// Mostrar detalle receta
async function loadRecipeDetail(id) {
  try {
    const data = await apiGet(`/meal/${id}`);
    const meal = data.meal;
    const ingredientsList = getIngredientsList(meal)
      .map(i => `<li>${i}</li>`)
      .join("");

    const isFav = favoriteIds.has(meal.idMeal);
    const bookmark = isFav
      ? "../assets/bookmark-on.png"
      : "../assets/bookmark-off.png";

    const instructionsParagraphs = meal.strInstructions
      .split("\n")
      .map(line => `<p>${line}</p>`)
      .join("");

    document
      .querySelectorAll(".section")
      .forEach(s => s.classList.add("hidden"));
    recipeDetail.classList.remove("hidden");

    const recipeTags = meal.strTags ? meal.strTags : "No tags available";

    recipeContent.innerHTML = `
      <div class="detail-card">
        <div class="detail-header">
          <img src="${meal.strMealThumb}/medium" alt="${meal.strMeal}">
          <div class="detail-info">
            <h1>${meal.strMeal}</h1>
            <div class="cat">
              <p><strong>Category:</strong> ${meal.strCategory}</p>
              <p><strong>Area:</strong> ${meal.strArea}</p>
              <p><strong>Tags:</strong> ${recipeTags}</p>            
            </div>
            <img
              src="${bookmark}"
              class="fav-icon"
              onclick="toggleFavorite('${meal.idMeal}', this)"
              alt="Favorite icon"
            />
          </div>
        </div>
        <div class="ingredients">
          <h3>Ingredients</h3>
          <ul>${ingredientsList}</ul>
        </div>
        </br>
        <div class="detail-body">
          <h3>Instructions</h3>
          <p>${instructionsParagraphs}</p>
        </div>
        <div class="detail-footer">
          <button onclick="backToSearch()">Go back</button>
        </div>
      </div>
    `;
  } catch (error) {
    recipeContent.innerHTML = `<p>Error loading recipe: ${error.message}</p>`;
  }
}

function getIngredientsList(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ""} - ${ingredient}`);
    }
  }

  return ingredients;
}

async function toggleFavorite(id, btn) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Must be logged in to manage favorites");
    return;
  }
  const isFav = favoriteIds.has(id);
  try {
    if (isFav) {
      // Quitar
      await fetch(`${API_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: { "x-token": token },
      });
      favoriteIds.delete(id);
      btn.src = "../assets/bookmark-off.png";
    } else {
      // Agregar
      await apiPost(`/favorites/${id}`);
      favoriteIds.add(id);
      btn.src = "../assets/bookmark-on.png";
    }
  } catch (error) {
    alert("Error loading favorites: " + error.message);
  }
}

function backToSearch() {
  recipeDetail.classList.add("hidden");
  document.getElementById("search-section").classList.remove("hidden");
}
