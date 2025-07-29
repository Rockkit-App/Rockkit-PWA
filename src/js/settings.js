// src/js/settings.js

// ✅ Safe-to-expose environment variable
import { GOOGLE_APPS_SCRIPT_WEB_APP_URL } from '../env.js';

/**
 * Centralized app settings manager
 */
const Settings = {
  /**
   * Get base URL (from env or override)
   */
  getApiBaseUrl() {
    return GOOGLE_APPS_SCRIPT_WEB_APP_URL;
  },

  /**
   * Get current user's auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || '';
  },

  /**
   * Get current companyId (for multi-tenant logic)
   */
  getCompanyId() {
    return localStorage.getItem('companyId') || '';
  },

  /**
   * Save session info (token, userId, companyId)
   */
  saveSession({ token, userId, companyId }) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('companyId', companyId);
  },

  /**
   * Clear saved session data
   */
  clearSession() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return !!this.getAuthToken() && !!this.getCompanyId();
  },

  /**
   * Optional: Load app config from Google Sheets backend
   */
  async loadAppConfig() {
    const res = await fetch(`${this.getApiBaseUrl()}?action=getConfig`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'X-Company-ID': this.getCompanyId(),
      }
    });

    if (!res.ok) throw new Error('Unable to fetch config');
    const config = await res.json();

    // Optionally cache or use it
    localStorage.setItem('appConfig', JSON.stringify(config));
    return config;
  },

  /**
   * Read cached config (if available)
   */
  getCachedConfig() {
    const raw = localStorage.getItem('appConfig');
    return raw ? JSON.parse(raw) : null;
  },
};

// Make available globally if needed
window.AppSettings = Settings;

export default Settings;
