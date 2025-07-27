// frontend/src/js/auth.js

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual OAuth 2.0 Client ID
const REDIRECT_URI = window.location.origin; // Optional, typically not needed for installed/PWA apps
const SCOPES = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

/**
 * Initiates Google Sign-In.
 */
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn()
        .then(() => {
            console.log('User signed in');
            loadUserProfile();
        })
        .catch(error => {
            console.error('Error signing in:', error);
        });
}

/**
 * Signs out the currently signed-in user.
 */
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
        .then(() => {
            console.log('User signed out');
            localStorage.removeItem('userProfile');
            localStorage.removeItem('authToken');
        });
}

/**
 * Loads the user's profile from Google and stores it locally.
 */
function loadUserProfile() {
    gapi.client.request({
        path: 'https://www.googleapis.com/userinfo/v2/me'
    })
    .then(response => {
        const user = response.result;
        console.log('User profile:', user);

        // Store user profile in localStorage or use for UI rendering
        localStorage.setItem('userProfile', JSON.stringify(user));

        // Save token for use in API calls
        const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        localStorage.setItem('authToken', token);
    })
    .catch(error => {
        console.error('Error loading user profile:', error);
    });
}

/**
 * Initializes the Google API client.
 */
function initClient() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: SCOPES
        })
        .then(() => {
            console.log('GAPI client initialized');
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                loadUserProfile();
            }
        })
        .catch(error => {
            console.error('Error initializing GAPI client:', error);
        });
    });
}

/**
 * Retrieves the OAuth token stored locally.
 * @returns {Promise<string>} - Access token or throws error if not available.
 */
async function getAuthToken() {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    return token;
}

// Automatically initialize on page load
window.onload = initClient;
