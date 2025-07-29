// src/js/auth.js

import Settings from './settings.js';

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // 🔁 Replace this with your actual Google OAuth Client ID
const SCOPES = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

/**
 * Initialize the Google Auth client
 */
function initClient() {
  gapi.load('client:auth2', async () => {
    try {
      await gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES });
      console.log('✅ GAPI client initialized');

      const authInstance = gapi.auth2.getAuthInstance();

      if (authInstance.isSignedIn.get()) {
        const googleUser = authInstance.currentUser.get();
        handlePostLogin(googleUser);
      }
    } catch (err) {
      console.error('❌ Failed to initialize GAPI client:', err);
    }
  });
}

/**
 * Sign in with Google
 */
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn()
    .then(user => handlePostLogin(user))
    .catch(err => console.error('❌ Sign-in failed:', err));
}

/**
 * Sign out and clear local session
 */
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut()
    .then(() => {
      Settings.clearSession();
      localStorage.removeItem('userProfile');
      console.log('👋 Signed out and session cleared');
      location.reload();
    });
}

/**
 * Handle post-login actions: save token + session info
 */
async function handlePostLogin(googleUser) {
  const profile = googleUser.getBasicProfile();
  const authResponse = googleUser.getAuthResponse();

  const user = {
    id: profile.getId(),
    name: profile.getName(),
    email: profile.getEmail(),
    imageUrl: profile.getImageUrl(),
    token: authResponse.access_token
  };

  // Save user info
  localStorage.setItem('userProfile', JSON.stringify(user));

  // Attempt to resolve companyId
  const companyId = await resolveCompanyId(user.email);

  // Save session using Settings helper
  Settings.saveSession({
    token: user.token,
    userId: user.id,
    companyId
  });

  console.log('✅ User logged in:', user.name);

  // Optional: navigate to main app or reload page
  location.reload();
}

/**
 * Infer company ID from email domain
 * You can replace this with an API call if needed
 */
function resolveCompanyId(email) {
  const domain = email.split('@')[1].split('.')[0];
  return domain.toLowerCase();
}

/**
 * Get auth token (helper)
 */
function getAuthToken() {
  const token = Settings.getAuthToken();
  if (!token) throw new Error('Not authenticated');
  return token;
}

/**
 * Check login status
 */
function isSignedIn() {
  return Settings.isLoggedIn();
}

// Auto-init Google Auth when script loads
window.addEventListener('load', initClient);

// Export methods
export {
  initClient,
  handleAuthClick,
  handleSignoutClick,
  getAuthToken,
  isSignedIn
};
