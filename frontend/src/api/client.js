//client class
const trimSlash = (value = "") => value.replace(/\/+$/, "");

const API_BASE_URL = trimSlash(import.meta.env.VITE_API_URL || "");

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};

export async function apiFetch(path, options = {}) {
  const url = buildApiUrl(path);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();

  let data = null;

  if (rawText) {
    if (contentType.includes("application/json")) {
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(`Invalid JSON returned from ${url}`);
      }
    } else {
      data = rawText;
    }
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.message ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${response.status})`;

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}