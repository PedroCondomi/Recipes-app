const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const randomBtn = document.getElementById("randomBtn");
const searchResults = document.getElementById("searchResults");
const recipeDetail = document.getElementById("recipe-detail");
const recipeContent = document.getElementById("recipeContent");
const backToSearch = document.getElementById("backToSearch");

// Buscar receta por nombre
searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const data = await apiGet(`/search?query=${query}`);
    renderSearchResults(data.meals || []);
  } catch (error) {
    searchResults.innerHTML = `<p>Error al buscar: ${error.message}</p>`;
  }
});

// Receta aleatoria
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

    document
      .querySelectorAll(".section")
      .forEach(s => s.classList.add("hidden"));
    recipeDetail.classList.remove("hidden");

    recipeContent.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p><strong>Categoría:</strong> ${meal.strCategory}</p>
      <p><strong>Área:</strong> ${meal.strArea}</p>
      <h4>Instrucciones</h4>
      <p>${meal.strInstructions}</p>
    `;
  } catch (error) {
    recipeContent.innerHTML = `<p>Error cargando receta: ${error.message}</p>`;
  }
}

// Volver a resultados
backToSearch.addEventListener("click", () => {
  recipeDetail.classList.add("hidden");
  document.getElementById("search-section").classList.remove("hidden");
});
