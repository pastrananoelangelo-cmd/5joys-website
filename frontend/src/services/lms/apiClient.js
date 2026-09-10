import { getToken } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function get(endpoint) {
  return request(endpoint, {
    method: "GET",
  });
}

export function post(endpoint, data) {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function put(endpoint, data) {
  return request(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function remove(endpoint) {
  return request(endpoint, {
    method: "DELETE",
  });
}

export async function postFile(endpoint, data) {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.blob();
}