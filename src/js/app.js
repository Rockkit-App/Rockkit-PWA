// src/js/app.js

/**
 * Checks if the user is authenticated.
 * Redirects to login if not authenticated.
 */
function checkAuth() {
  const user = localStorage.getItem('userProfile');
  const token = localStorage.getItem('authToken');

  if (!user || !token) {
    console.warn('User not authenticated, redirecting to login.');
    window.location.href = '/Rockkit-PWA/index.html';
  } else {
    console.log('Authenticated user:', JSON.parse(user));
    renderUserHeader(JSON.parse(user));
  }
}

/**
 * Renders the user info on the dashboard header.
 */
function renderUserHeader(user) {
  const userEl = document.getElementById('user-info');
  if (userEl) {
    userEl.innerHTML = `
      <div class="text-sm text-gray-700">Welcome, ${user.name}</div>
      <div class="text-xs text-gray-500">${user.email}</div>
    `;
  }
}

/**
 * Get stored access token.
 */
function getAccessToken() {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No access token found');
  return token;
}

/**
 * Makes an authenticated request to the backend.
 */
async function fetchWithAuth(endpoint, options = {}) {
  const token = getAccessToken();

  const res = await fetch(endpoint, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      alert('Session expired. Please sign in again.');
      localStorage.clear();
      window.location.href = '/Rockkit-PWA/index.html';
    }
    throw new Error(`API Error: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Handle logout.
 */
function logout() {
  if (gapi.auth2) {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('Logged out from Google');
    });
  }
  localStorage.clear();
  window.location.href = '/Rockkit-PWA/index.html';
}

/**
 * Offline UI warning
 */
function setupOfflineBanner() {
  const offlineBanner = document.getElementById('offline-banner');
  if (!offlineBanner) return;

  function toggleBanner() {
    if (navigator.onLine) {
      offlineBanner.classList.add('hidden');
    } else {
      offlineBanner.classList.remove('hidden');
    }
  }

  window.addEventListener('online', toggleBanner);
  window.addEventListener('offline', toggleBanner);

  toggleBanner(); // Initial check
}

// Run on dashboard pages
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  setupOfflineBanner();
});
