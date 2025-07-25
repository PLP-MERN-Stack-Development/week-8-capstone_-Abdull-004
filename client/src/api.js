// src/api.js

export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/api${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
    }

    return await res.json();
};
