function login() {
  window.location.href = "/auth/google";
}

function logout() {
  localStorage.removeItem("token");
  loadUserUI();
}

function loadUserUI() {
  const token = localStorage.getItem("token");
  const userInfo = document.getElementById("user-info");

  if (!token) {
    userInfo.innerHTML = `<button onclick="login()">Login con Google</button>`;
  } else {
    userInfo.innerHTML = `
      <div class="profile">
        <img src="https://via.placeholder.com/40" alt="User" />
        <p>Usuario logueado</p>
        <button onclick="logout()">Logout</button>
      </div>
    `;
  }
}

loadUserUI();
