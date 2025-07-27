// frontend/src/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    checkAuthentication();
    setupRouting();

    // Listen for hash changes to support navigation
    window.addEventListener('hashchange', setupRouting);
}

function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    const currentRoute = getCurrentRoute();

    const publicRoutes = ['/', '/login'];

    if (!token && !publicRoutes.includes(currentRoute)) {
        window.location.hash = '#/login';
    }

    if (token && publicRoutes.includes(currentRoute)) {
        window.location.hash = '#/dashboard';
    }
}

function setupRouting() {
    const route = getCurrentRoute();

    switch (route) {
        case '/':
        case '/login':
            loadLoginPage();
            break;
        case '/dashboard':
            loadDashboard();
            break;
        case '/transactions':
            loadTransactions();
            break;
        case '/production':
            loadProduction();
            break;
        case '/recipes':
            loadRecipes();
            break;
        case '/inventory':
            loadInventory();
            break;
        case '/credits':
            loadCredits();
            break;
        case '/expenses':
            loadExpenses();
            break;
        case '/settings':
            loadSettings();
            break;
        default:
            load404Page();
            break;
    }
}

function getCurrentRoute() {
    const hash = window.location.hash || '#/';
    return hash.replace('#', '');
}

// ------------------------
// Page Load Functions
// ------------------------

function loadLoginPage() {
    console.log("Login Page Loaded");
    // Optional: fetch or setup login page content
}

function loadDashboard() {
    console.log("Dashboard Loaded");
}

function loadTransactions() {
    console.log("Transactions Page Loaded");
}

function loadProduction() {
    console.log("Production Page Loaded");
}

function loadRecipes() {
    console.log("Recipes Page Loaded");
}

function loadInventory() {
    console.log("Inventory Page Loaded");
}

function loadCredits() {
    console.log("Credits Page Loaded");
}

function loadExpenses() {
    console.log("Expenses Page Loaded");
}

function loadSettings() {
    console.log("Settings Page Loaded");
}

function load404Page() {
    document.body.innerHTML = `
        <div class="flex items-center justify-center h-screen bg-gray-100">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-2">404</h1>
                <p class="text-lg mb-4">Page not found</p>
                <a href="#/login" class="text-blue-600 hover:underline">Go to Login</a>
            </div>
        </div>
    `;
}
