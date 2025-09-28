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
    favoritesList.innerHTML = `<p>Debes iniciar sesión para ver favoritos.</p>`;
    return;
  }
  try {
    const data = await apiGet("/favorites");
    renderFavorites(data.favorites || []);
  } catch (error) {
    favoritesList.innerHTML = `<p>Error al cargar favoritos: ${error.message}</p>`;
  }
}

function renderFavorites(favorites) {
  if (!favorites.length) {
    favoritesList.innerHTML = "<p>No tienes favoritos guardados.</p>";
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      fav => `
        <div class="card">
          <img src="${fav.thumbnail}" alt="${fav.name}" 
               onclick="loadRecipeDetail('${fav.mealId}')"/>
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
    searchResults.innerHTML = `<p>Error al buscar: ${error.message}</p>`;
  }
});

// Random recipe
randomBtn.addEventListener("click", async () => {
  try {
    const data = await apiGet("/meal/random");
    renderSearchResults(data.meal || []);
  } catch (error) {
    searchResults.innerHTML = `<p>Error al obtener receta aleatoria: ${error.message}</p>`;
  }
});

// Renderizar resultados
function renderSearchResults(meals) {
  if (!meals.length) {
    searchResults.innerHTML = "<p>No se encontraron recetas.</p>";
    return;
  }

  searchResults.innerHTML = meals
    .map(
      meal => `
    <div class="card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
      <button onclick="loadRecipeDetail('${meal.idMeal}')">Ver detalle</button>
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
    // console.log(meal);

    const isFav = favoriteIds.has(meal.idMeal);
    const btnText = isFav ? "❌ Delete from favorites" : "⭐ Add to favorites";

    document
      .querySelectorAll(".section")
      .forEach(s => s.classList.add("hidden"));
    recipeDetail.classList.remove("hidden");

    recipeContent.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <button onclick="toggleFavorite('${meal.idMeal}', this)">${btnText}</button>
      <p><strong>Categoría:</strong> ${meal.strCategory}</p>
      <p><strong>Área:</strong> ${meal.strArea}</p>
      <h4>Instrucciones</h4>
      <p>${meal.strInstructions}</p>
    `;
  } catch (error) {
    recipeContent.innerHTML = `<p>Error cargando receta: ${error.message}</p>`;
  }
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
      btn.textContent = "⭐ Agregar a favoritos";
    } else {
      // Agregar
      await apiPost(`/favorites/${id}`);
      favoriteIds.add(id);
      btn.textContent = "❌ Quitar de favoritos";
    }
  } catch (error) {
    alert("Error al agregar a favoritos: " + error.message);
  }
}
