const trimSlash = (value = "") => value.replace(/\/+$/, "");

// If VITE_API_URL is empty, requests stay relative and become /api/...
// That works with local Vite proxy and with same-domain production setups.
const API_URL = trimSlash(import.meta.env.VITE_API_URL || "");

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  if (response.status === 204) return null;

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      data?.error ||
      `HTTP ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return Array.isArray(data) ? data : data?.results || data;
};

const apiFetch = async (endpoint, options = {}) => {
  const normalizedEndpoint = endpoint.startsWith("/api")
    ? endpoint
    : `/api${endpoint}`;

  const url = API_URL
    ? `${API_URL}${normalizedEndpoint}`
    : normalizedEndpoint;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  return handleResponse(response);
};

// -----------------------------
// MODULES
// -----------------------------
export const getModules = () => apiFetch("/modules/");

export const createModule = (data) =>
  apiFetch("/modules/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateModule = (id, data) =>
  apiFetch(`/modules/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteModule = (id) =>
  apiFetch(`/modules/${id}/`, {
    method: "DELETE",
  });

// -----------------------------
// EXAMS
// -----------------------------
export const getExams = () => apiFetch("/exams/");

export const createExam = (data) =>
  apiFetch("/exams/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateExam = (id, data) =>
  apiFetch(`/exams/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteExam = (id) =>
  apiFetch(`/exams/${id}/`, {
    method: "DELETE",
  });

// -----------------------------
// ASSIGNMENTS
// -----------------------------
export const getAssignments = () => apiFetch("/assignments/");

export const createAssignment = (data) =>
  apiFetch("/assignments/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateAssignment = (id, data) =>
  apiFetch(`/assignments/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteAssignment = (id) =>
  apiFetch(`/assignments/${id}/`, {
    method: "DELETE",
  });

// -----------------------------
// STUDY TASKS
// -----------------------------
export const getTasks = () => apiFetch("/tasks/");

export const createTask = (data) =>
  apiFetch("/tasks/", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateTask = (id, data) =>
  apiFetch(`/tasks/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteTask = (id) =>
  apiFetch(`/tasks/${id}/`, {
    method: "DELETE",
  });