// This file handles user settings and preferences.

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');
    const languageSelect = document.getElementById('language-select');
    const notificationToggle = document.getElementById('notification-toggle');

    // Load saved settings
    loadSettings();

    // Event listener for form submission
    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        saveSettings();
    });

    // Function to load settings from localStorage
    function loadSettings() {
        const language = localStorage.getItem('language') || 'en';
        const notificationsEnabled = localStorage.getItem('notifications') === 'true';

        languageSelect.value = language;
        notificationToggle.checked = notificationsEnabled;
    }

    // Function to save settings to localStorage
    function saveSettings() {
        const selectedLanguage = languageSelect.value;
        const notificationsEnabled = notificationToggle.checked;

        localStorage.setItem('language', selectedLanguage);
        localStorage.setItem('notifications', notificationsEnabled);

        alert('Settings saved successfully!');
    }
});