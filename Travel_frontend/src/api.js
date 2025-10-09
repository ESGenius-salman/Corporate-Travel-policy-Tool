// src/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      credentials: 'include', // for cookies/session
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'API request failed');
    }

    return await response.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};
