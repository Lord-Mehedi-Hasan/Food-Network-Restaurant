const API_BASE = 'http://localhost:5000/api';

const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  login: async (credentials) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  register: async (data) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMe: async (token) => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  upgradeSubscription: async (token, tier) => {
    const res = await fetch(`${API_BASE}/auth/upgrade-subscription`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ tier }),
    });
    return res.json();
  },

  // User: Meal Plan & Shopping List
  getMealPlan: async (token) => {
    const res = await fetch(`${API_BASE}/user/meal-plan`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  addMealPlanSlot: async (token, slotData) => {
    const res = await fetch(`${API_BASE}/user/meal-plan`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(slotData),
    });
    return res.json();
  },

  removeMealPlanSlot: async (token, slotId) => {
    const res = await fetch(`${API_BASE}/user/meal-plan/${slotId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.json();
  },

  getShoppingList: async (token) => {
    const res = await fetch(`${API_BASE}/user/shopping-list`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  addShoppingItems: async (token, items) => {
    const res = await fetch(`${API_BASE}/user/shopping-list`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ items }),
    });
    return res.json();
  },

  toggleShoppingItem: async (token, itemId) => {
    const res = await fetch(`${API_BASE}/user/shopping-list/${itemId}/toggle`, {
      method: 'PUT',
      headers: getHeaders(token),
    });
    return res.json();
  },

  deleteShoppingItem: async (token, itemId) => {
    const res = await fetch(`${API_BASE}/user/shopping-list/${itemId}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.json();
  },

  clearShoppingList: async (token, onlyChecked = false) => {
    const res = await fetch(`${API_BASE}/user/shopping-list?onlyChecked=${onlyChecked}`, {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    return res.json();
  },

  toggleSaveRecipe: async (token, recipeId) => {
    const res = await fetch(`${API_BASE}/user/saved-recipes/${recipeId}`, {
      method: 'POST',
      headers: getHeaders(token),
    });
    return res.json();
  },

  // Recipes
  getRecipes: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/recipes?${query}`);
    return res.json();
  },

  getRecipeById: async (idOrSlug, token) => {
    const res = await fetch(`${API_BASE}/recipes/${idOrSlug}`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  rateRecipe: async (id, rating) => {
    const res = await fetch(`${API_BASE}/recipes/${id}/review`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ rating }),
    });
    return res.json();
  },

  // Restaurants
  getRestaurants: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/restaurants?${query}`);
    return res.json();
  },

  getRestaurantById: async (idOrSlug) => {
    const res = await fetch(`${API_BASE}/restaurants/${idOrSlug}`);
    return res.json();
  },

  addRestaurantReview: async (id, reviewData, token) => {
    const res = await fetch(`${API_BASE}/restaurants/${id}/reviews`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(reviewData),
    });
    return res.json();
  },

  // Reservations
  createReservation: async (reservationData, token) => {
    const res = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(reservationData),
    });
    return res.json();
  },

  getMyReservations: async (token) => {
    const res = await fetch(`${API_BASE}/reservations/my`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  cancelReservation: async (id, token) => {
    const res = await fetch(`${API_BASE}/reservations/${id}/cancel`, {
      method: 'PUT',
      headers: getHeaders(token),
    });
    return res.json();
  },

  // Orders
  createOrder: async (orderData, token) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(orderData),
    });
    return res.json();
  },

  getOrderById: async (idOrOrderNumber) => {
    const res = await fetch(`${API_BASE}/orders/${idOrOrderNumber}`);
    return res.json();
  },

  updateOrderStatus: async (id, status, note) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status, note }),
    });
    return res.json();
  },

  getMyOrders: async (token) => {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: getHeaders(token),
    });
    return res.json();
  },

  // Beverages
  getBeverages: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/beverages?${query}`);
    return res.json();
  },

  getSubscriptionBoxes: async () => {
    const res = await fetch(`${API_BASE}/beverages/subscription-boxes`);
    return res.json();
  },

  joinSubscriptionBox: async (data, token) => {
    const res = await fetch(`${API_BASE}/beverages/subscription-boxes/join`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getEvents: async () => {
    const res = await fetch(`${API_BASE}/beverages/events`);
    return res.json();
  },

  bookEventTicket: async (data, token) => {
    const res = await fetch(`${API_BASE}/beverages/events/book-ticket`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Admin Metrics
  getAdminMetrics: async () => {
    const res = await fetch(`${API_BASE}/admin/metrics`);
    return res.json();
  },
};
