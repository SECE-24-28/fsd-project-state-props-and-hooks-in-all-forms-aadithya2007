const API_URL = "https://backend-9nuv.onrender.com/api";

export function getStoredAuth() {
  const rawAuth = localStorage.getItem("vegimartAuth");
  return rawAuth ? JSON.parse(rawAuth) : null;
}

export function formatProductPrice(product) {
  const price = Number(product.price || 0);
  return `Rs. ${price.toFixed(2)}${product.unit ? ` / ${product.unit}` : ""}`;
}

export async function apiRequest(path, options = {}) {
  const auth = getStoredAuth();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}
