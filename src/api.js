const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Get stored token
const getToken = () => localStorage.getItem('rvl-token');

// Generic fetch wrapper with auth
async function apiFetch(endpoint, options = {}) {
    const token = getToken();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
        ...options,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'API request failed');
    }

    return data;
}

// ===== Auth =====
export const authAPI = {
    login: (email, password) =>
        apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    register: (name, email, password) =>
        apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
    me: () => apiFetch('/auth/me'),
};

// ===== Applications =====
export const applicationsAPI = {
    getAll: (params = '') => apiFetch(`/applications${params ? '?' + params : ''}`),
    getStats: () => apiFetch('/applications/stats'),
    create: (data) => apiFetch('/applications', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/applications/${id}`, { method: 'DELETE' }),
};

// ===== News =====
export const newsAPI = {
    getAll: (params = '') => apiFetch(`/news${params ? '?' + params : ''}`),
    getById: (id) => apiFetch(`/news/${id}`),
    create: (data) => apiFetch('/news', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/news/${id}`, { method: 'DELETE' }),
};

// ===== Services =====
export const servicesAPI = {
    getAll: (category) => apiFetch(`/services${category ? '?category=' + category : ''}`),
    create: (data) => apiFetch('/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/services/${id}`, { method: 'DELETE' }),
};

// ===== Branches =====
export const branchesAPI = {
    getAll: () => apiFetch('/branches'),
    create: (data) => apiFetch('/branches', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/branches/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/branches/${id}`, { method: 'DELETE' }),
};

// ===== Messages =====
export const messagesAPI = {
    getAll: () => apiFetch('/messages'),
    send: (data) => apiFetch('/messages', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiFetch(`/messages/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ===== Users (admin) =====
export const usersAPI = {
    getAll: () => apiFetch('/users'),
    update: (id, data) => apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/users/${id}`, { method: 'DELETE' }),
};

// ===== Settings (admin) =====
export const settingsAPI = {
    get: () => apiFetch('/settings'),
    update: (data) => apiFetch('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
