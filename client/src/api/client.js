const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }
  return data;
}

export const authApi = {
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: { name, email, password } }),
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),
};

export const tasksApi = {
  list: (token, category) =>
    request(`/tasks${category ? `?category=${category}` : ''}`, { token }),
  create: (token, task) => request('/tasks', { method: 'POST', body: task, token }),
  update: (token, id, task) => request(`/tasks/${id}`, { method: 'PUT', body: task, token }),
  remove: (token, id) => request(`/tasks/${id}`, { method: 'DELETE', token }),
};
