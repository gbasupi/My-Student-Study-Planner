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
  return Array.isArray(data) ? data : data.results || [];
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

export const getModules = () => apiFetch("/modules/");
export const getExams = () => apiFetch("/exams/");
export const getAssignments = () => apiFetch("/assignments/");
export const getTasks = () => apiFetch("/tasks/");