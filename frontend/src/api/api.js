const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://my-student-study-planner-backend-production.up.railway.app"
).replace(/\/$/, "");

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Server returned non-JSON response (${response.status}). Response starts with: ${text.slice(0, 80)}`
    );
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON returned from server");
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      data?.password2?.[0] ||
      `HTTP ${response.status}`;

    throw new Error(message);
  }

  return Array.isArray(data) ? data : data.results || data;
};

const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  return handleResponse(response);
};

// -----------------------------
// AUTH
// -----------------------------
export const loginUser = (email, password) =>
  apiFetch("/auth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email.trim(),
      password,
    }),
  });

export const registerUser = (data) =>
  apiFetch("/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const getCurrentUser = (token) =>
  fetch(`${API_URL}/api/auth/user/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }).then(handleResponse);

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
