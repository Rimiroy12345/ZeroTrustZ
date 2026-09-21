const API_BASE_URL = "https://zerotrustz.onrender.com";

export function getStoredToken() {
  return (
    localStorage.getItem("zerotrustz_token") ||
    sessionStorage.getItem("zerotrustz_token")
  );
}

export function getStoredUserId() {
  return (
    localStorage.getItem("zerotrustz_userId") ||
    sessionStorage.getItem("zerotrustz_userId")
  );
}

export function storeSession(token, userId, remember) {
  clearStoredSession();

  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("zerotrustz_token", token);
  storage.setItem("zerotrustz_userId", userId);
}

export function clearStoredSession() {
  localStorage.removeItem("zerotrustz_token");
  localStorage.removeItem("zerotrustz_userId");
  sessionStorage.removeItem("zerotrustz_token");
  sessionStorage.removeItem("zerotrustz_userId");
}

export async function loginUser(userId, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Authentication failed");
  }

  return data;
}

export async function validateSession(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { valid: false };
  }

  return response.json();
}

export async function logoutUser(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json().catch(() => ({}));
}
