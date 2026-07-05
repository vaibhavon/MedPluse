const rawApiBaseUrl = import.meta.env.VITE_API_URL || "";
const apiBaseUrl = rawApiBaseUrl.replace(/\/$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (apiBaseUrl.endsWith("/api") && normalizedPath.startsWith("/api/")) {
    return `${apiBaseUrl}${normalizedPath.slice(4)}`;
  }

  return `${apiBaseUrl}${normalizedPath}`;
}

// Authorization header for protected API calls, read from the persisted auth
// state. Returns {} when logged out so it can be spread into fetch headers.
export function authHeaders() {
  try {
    const auth = JSON.parse(localStorage.getItem("medpulse_auth"));
    return auth?.token ? { Authorization: `Bearer ${auth.token}` } : {};
  } catch {
    return {};
  }
}
