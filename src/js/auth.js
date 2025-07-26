// frontend/src/js/auth.js

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const SCOPES = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log('User signed in');
        loadUserProfile();
    }).catch(error => {
        console.error('Error signing in', error);
    });
}

function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut().then(() => {
        console.log('User signed out');
    });
}

function loadUserProfile() {
    gapi.client.request({
        'path': 'https://www.googleapis.com/userinfo/v2/me'
    }).then(response => {
        const user = response.result;
        console.log('User profile:', user);
        // Handle user profile data (e.g., store in local storage, update UI)
    }).catch(error => {
        console.error('Error loading user profile', error);
    });
}

function initClient() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
            scope: SCOPES
        }).then(() => {
            console.log('GAPI client initialized');
            // Check if user is already signed in
            if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                loadUserProfile();
            }
        });
    });
}

// Call initClient on window load
window.onload = initClient;