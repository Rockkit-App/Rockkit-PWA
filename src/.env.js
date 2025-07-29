// src/env.js

// ✅ Environment configuration for frontend usage
// ⚠️ Do NOT include secrets or private API keys here in public repos

// ✅ Base URL for your deployed Google Apps Script Web App endpoint
// This URL is safe to expose *if* your backend validates requests (e.g., with tokens)
const GOOGLE_APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx0VN6NMNGDqiHBpQwyk2sxlUZkfBEvYtawzoUae-ctpFpvGV1xAdUBrpHcMOS1NRg/exec';

// ✅ Google OAuth Client ID
// Safe to expose — required for frontend authentication via Google Sign-In
const GOOGLE_CLIENT_ID = '967200877297-47fl0ru4hucdbpasa1p7vr174b4mjp1b.apps.googleusercontent.com'; // ⛔ Replace with your actual OAuth client ID

// ✅ Optional: Central Admin Sheet ID for multi-tenant config lookup
// Only safe if the backend uses this ID and enforces access rules
const ADMIN_SHEET_ID = '1Zq8BU3Lt4bKzQXUIcKsotzFw4Tiy6toNun8UpP9nvjQ';

// ✅ Timeout for API requests (in milliseconds)
const API_TIMEOUT = 10000;

// ✅ Export for use in other modules
export {
  GOOGLE_APPS_SCRIPT_WEB_APP_URL,
  GOOGLE_CLIENT_ID,
  ADMIN_SHEET_ID,
  API_TIMEOUT
};
