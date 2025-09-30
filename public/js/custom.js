// ====== ELEMENTOS ======
const customSection = document.getElementById("custom-section");
const customList = document.getElementById("customList");
const newCustomBtn = document.getElementById("newCustomBtn");
const customModal = document.getElementById("customModal");
const customModalTitle = document.getElementById("customModalTitle");
const saveCustom = document.getElementById("saveCustom");
const cancelCustom = document.getElementById("cancelCustom");
const customTitle = document.getElementById("customTitle");
const customInstructions = document.getElementById("customInstructions");
const ingredientName = document.getElementById("ingredientName");
const ingredientAmount = document.getElementById("ingredientAmount");
const addIngredientBtn = document.getElementById("addIngredientBtn");
const ingredientsList = document.getElementById("ingredientsList");
const customLink = document.querySelector('[data-section="custom"]');

let editingRecipeId = null; // null = creando, id = editando
let ingredients = [];

// ====== MOSTRAR SECCIÓN ======
customLink.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Must be logged in to see own recipes.");
    return;
  }

  // Ocultar otras secciones
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  customSection.classList.remove("hidden");

  await loadCustomRecipes();
});

// ====== CARGAR LISTA ======
async function loadCustomRecipes() {
  try {
    const data = await apiGet("/custom");
    const recipes = data["custom recipes"];

    if (!recipes.length) {
      customList.innerHTML = "<p>You don't have any custom recipes.</p>";
      return;
    }

    customList.innerHTML = recipes
      .map(
        r => `
      <div class="card">
        <h3>${r.title}</h3>
        <button onclick="showCustomDetail('${r._id}')">See details</button>
        <button onclick="deleteCustomRecipe('${r._id}')">Delete</button>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error(error);
    customList.innerHTML = "<p>Error loading recipes.</p>";
  }
}

// ====== MODAL ======
newCustomBtn.addEventListener("click", () => openCustomModal());
cancelCustom.addEventListener("click", () => closeCustomModal());

function openCustomModal(recipe = null) {
  editingRecipeId = recipe ? recipe._id : null;
  document.getElementById("customModalTitle").textContent = recipe
    ? "Edit recipe"
    : "New recipe";

  // Pre-cargar datos si es edición
  customTitle.value = recipe?.title || "";
  customInstructions.value = recipe?.instructions || "";

  // Limpiar/cargar ingredientes
  ingredientsList.innerHTML = "";
  (recipe?.ingredients || []).forEach(i =>
    addIngredientToList(i.name, i.amount)
  );

  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));

  customModal.classList.remove("hidden");
}

function closeCustomModal() {
  editingRecipeId = null;
  customTitle.value = "";
  customInstructions.value = "";
  ingredientsList.innerHTML = "";
  ingredientName.value = "";
  ingredientAmount.value = "";
  customModal.classList.add("hidden");

  customSection.classList.remove("hidden");

  customModal.classList.add("hidden");
}

// ====== INGREDIENTES DINÁMICOS ======
function addIngredientToList(name, amount) {
  const li = document.createElement("li");
  li.textContent = `${amount} - ${name}`;
  li.dataset.name = name;
  li.dataset.amount = amount;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.style.marginLeft = "8px";
  removeBtn.addEventListener("click", () => li.remove());

  li.appendChild(removeBtn);
  ingredientsList.appendChild(li);
}

addIngredientBtn.addEventListener("click", () => {
  const name = ingredientName.value.trim();
  const amount = ingredientAmount.value.trim();
  if (!name || !amount) return alert("Write name and quantity.");
  addIngredientToList(name, amount);
  ingredientName.value = "";
  ingredientAmount.value = "";
});

// ====== GUARDAR ======
saveCustom.addEventListener("click", async () => {
  const title = customTitle.value.trim();
  const instructions = customInstructions.value.trim();
  const ingredients = [...ingredientsList.querySelectorAll("li")].map(li => ({
    name: li.dataset.name,
    amount: li.dataset.amount,
  }));

  if (!title || !instructions)
    return alert("Must write a name and instructions.");

  try {
    if (editingRecipeId) {
      await apiPut(`/custom/${editingRecipeId}`, {
        title,
        instructions,
        ingredients,
      });
    } else {
      await apiPost("/custom", { title, instructions, ingredients });
    }
    closeCustomModal();
    loadCustomRecipes();
  } catch (err) {
    console.error(err);
    alert("Error saving the recipe");
  }
});

// ====== DETALLE ======
async function showCustomDetail(id) {
  try {
    const recipe = await apiGet(`/custom/${id}`);
    const ingredientsDisplay = recipe.ingredients.length
      ? `<ul>${recipe.ingredients
          .map(i => `<li>${i.amount} - ${i.name}</li>`)
          .join("")}</ul>`
      : "<p><em>No ingredients</em></p>";

    recipeContent.innerHTML = `
    <div class="detail-card">
          <h1>${recipe.title}</h1>
             
      <div class="ingredients">
      <h3>Ingredients</h3>
      ${ingredientsDisplay}
      </div>
      </br>
      <div class="detail-body">
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
      </div>
      <div class="detail-footer">
          <button onclick="openCustomModal(${JSON.stringify(recipe).replace(
            /"/g,
            "&quot;"
          )})">Edit</button>
      <button onclick="backToCustom()">Go back</button>
        </div>      
    </div>
    `;

    document
      .querySelectorAll(".section")
      .forEach(s => s.classList.add("hidden"));
    recipeDetail.classList.remove("hidden");
  } catch (error) {
    console.error(error);
  }
}

function backToCustom() {
  recipeDetail.classList.add("hidden");
  customSection.classList.remove("hidden");
}

// ====== ELIMINAR ======
async function deleteCustomRecipe(id) {
  if (!confirm("Delete this recipe?")) return;
  try {
    await apiDelete(`/custom/${id}`);
    loadCustomRecipes();
  } catch (err) {
    console.error(err);
    alert("Couldn't delete recipe.");
  }
}
