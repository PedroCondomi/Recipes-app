const API_URL = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

// Obtener token temporal de cookie y guardarlo en localStorage
async function fetchToken() {
  try {
    const res = await fetch(`${API_URL}/get-token`, { credentials: "include" });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      loadUserUI(); // actualizar UI
    }
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}

fetchToken();

async function apiGet(path) {
  const res = await fetch(API_URL + path, {
    method: "GET",
    headers: { "x-token": getToken() || "" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error GET " + path);
  return res.json();
}

async function apiPost(path, data = {}) {
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": getToken() || "",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error POST " + path);
  return res.json();
}
