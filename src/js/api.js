// src/js/api.js

const BASE_URL = 'https://script.google.com/macros/s/AKfycbx0VN6NMNGDqiHBpQwyk.../exec'; // 🔁 Update with your full GAS Web App URL

/**
 * Returns stored auth token and company ID.
 */
function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  const companyId = localStorage.getItem('companyId');

  if (!token || !companyId) {
    throw new Error('Missing auth or company ID');
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Company-ID': companyId, // Optional header if your GAS reads this
  };
}

/**
 * Generic API POST call to backend Apps Script.
 */
async function callApi(action, payload = {}) {
  const body = {
    action,
    ...payload,
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 401) {
      alert('Session expired. Please log in again.');
      localStorage.clear();
      window.location.href = '/Rockkit-PWA/index.html';
    }
    throw new Error(`API error: ${res.statusText}`);
  }

  const data = await res.json();
  if (data.error) throw new Error(data.error);

  return data;
}

/**
 * Example API calls for your modules
 */
async function getInventory() {
  return await callApi('getInventory');
}

async function saveTransaction(transaction) {
  return await callApi('saveTransaction', { transaction });
}

async function getCompanyConfig() {
  return await callApi('getConfig');
}

// Export to window if needed globally
window.RockkitAPI = {
  getInventory,
  saveTransaction,
  getCompanyConfig,
};
