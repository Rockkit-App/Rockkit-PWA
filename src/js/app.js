document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    checkAuthentication();
    setupRouting();
    window.addEventListener('hashchange', () => {
        checkAuthentication();
        setupRouting();
    });
}

function getCurrentRoute() {
    const hash = window.location.hash || '#/';
    return hash.replace('#', '');
}

function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

function checkAuthentication() {
    const route = getCurrentRoute();
    const publicRoutes = ['/', '/login'];

    if (!isAuthenticated() && !publicRoutes.includes(route)) {
        window.location.hash = '#/login';
    }

    if (isAuthenticated() && publicRoutes.includes(route)) {
        window.location.hash = '#/dashboard';
    }
}

function setupRouting() {
    const route = getCurrentRoute();
    const app = document.getElementById('app');

    switch (route) {
        case '/':
        case '/login':
            loadLoginPage(app);
            break;
        case '/dashboard':
            loadDashboard(app);
            break;
        case '/transactions':
            loadTransactions(app);
            break;
        case '/production':
            loadProduction(app);
            break;
        case '/recipes':
            loadRecipes(app);
            break;
        case '/inventory':
            loadInventory(app);
            break;
        case '/credits':
            loadCredits(app);
            break;
        case '/expenses':
            loadExpenses(app);
            break;
        case '/settings':
            loadSettings(app);
            break;
        default:
            load404Page(app);
            break;
    }
}

// ------------------------
// Page Load Functions
// ------------------------

function loadLoginPage(app) {
    console.log("Login Page Loaded");
    app.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-md w-96 mx-auto mt-20">
            <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
            <form id="login-form">
                <input type="email" id="email" required class="mb-2 w-full border p-2 rounded" placeholder="Email" />
                <input type="password" id="password" required class="mb-4 w-full border p-2 rounded" placeholder="Password" />
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
            </form>
        </div>
    `;

    document.getElementById('login-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('authToken', data.token);
                window.location.hash = '#/dashboard';
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Login failed');
        }
    });
}

function loadDashboard(app) {
    console.log("Dashboard Loaded");
    app.innerHTML = `<div class="text-center mt-10">Welcome to the Dashboard</div>`;
}

function loadTransactions(app) {
    console.log("Transactions Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Transactions</div>`;
}

function loadProduction(app) {
    console.log("Production Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Production</div>`;
}

function loadRecipes(app) {
    console.log("Recipes Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Recipes</div>`;
}

function loadInventory(app) {
    console.log("Inventory Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Inventory</div>`;
}

function loadCredits(app) {
    console.log("Credits Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Credits</div>`;
}

function loadExpenses(app) {
    console.log("Expenses Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Expenses</div>`;
}

function loadSettings(app) {
    console.log("Settings Page Loaded");
    app.innerHTML = `<div class="text-center mt-10">Settings</div>`;
}

function load404Page(app) {
    app.innerHTML = `
        <div class="flex items-center justify-center h-screen bg-gray-100">
            <div class="text-center">
                <h1 class="text-4xl font-bold mb-2">404</h1>
                <p class="text-lg mb-4">Page not found</p>
                <a href="#/login" class="text-blue-600 hover:underline">Go to Login</a>
            </div>
        </div>
    `;
}
