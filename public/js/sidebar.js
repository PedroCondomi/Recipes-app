const toggleSidebar = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

function login() {
  window.location.href = "/auth/google";
}

function logout() {
  localStorage.removeItem("token");
  loadUserUI();
}

async function loadUserUI() {
  const token = localStorage.getItem("token");
  const userInfo = document.getElementById("user-info");

  if (!token) {
    userInfo.innerHTML = `<button onclick="login()">Login con Google</button>`;
    return;
  }

  try {
    const res = await fetch("/users/me", {
      headers: { "x-token": token },
    });

    if (!res.ok) throw new Error("No autorizado");
    const user = await res.json();

    userInfo.innerHTML = `
      <div class="profile">
        <img src="${user.image}" alt="Foto de ${user.displayName}" />
        <p>${user.displayName}</p>
        <button onclick="logout()">Logout</button>
      </div>
    `;
    await loadFavoritesIds();
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    localStorage.removeItem("token");
    userInfo.innerHTML = `<button onclick="login()">Login con Google</button>`;
  }
}

loadUserUI();
