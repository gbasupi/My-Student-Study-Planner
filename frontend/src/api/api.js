const API_URL = (
  import.meta.env.VITE_API_URL || 
  'https://my-student-study-planner-backend-production.up.railway.app'
).replace(/\/$/, "");

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Token ${token}` : "",
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  const data = await response.json();
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
