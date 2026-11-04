async function request(url, options = {}) {
  const headers = {};
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }
  Object.assign(headers, options.headers);

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}));
    throw new Error(problem.message || `Zahteva ni uspela (${response.status}).`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export const tripsApi = {
  list() {
    return request('/api/potovanja');
  },
  create(trip) {
    return request('/api/potovanja', {
      method: 'POST',
      body: JSON.stringify(trip),
    });
  },
  update(id, trip) {
    return request(`/api/potovanja/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trip),
    });
  },
  remove(id) {
    return request(`/api/potovanja/${id}`, { method: 'DELETE' });
  },
};
