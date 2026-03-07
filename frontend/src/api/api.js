const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.results || data;
};

const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`/api${endpoint}`, {
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


// -----------------------------
// ASSIGNMENTS
// -----------------------------
export const getAssignments = () => apiFetch("/assignments/");


// -----------------------------
// STUDY TASKS
// -----------------------------
export const getTasks = () => apiFetch("/tasks/");