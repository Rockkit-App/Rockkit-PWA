// api.js
// Centralized API client for communicating with the Google Apps Script backend.

const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbx0VN6NMNGDqiHBpQwyk2sxlUZkfBEvYtawzoUae-ctpFpvGV1xAdUBrpHcMOS1NRg/exec'; // Replace with your actual deployed Web App URL

/**
 * Generic API request handler.
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} method - HTTP method (GET, POST).
 * @param {Object|null} body - Request payload for POST requests.
 * @returns {Promise<Object>} - Parsed JSON response.
 */
async function fetchFromAPI(endpoint, method = 'GET', body = null) {
    const token = await getAuthToken(); // Implement this to get Google OAuth token

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

// Dashboard
async function getDashboard() {
    return fetchFromAPI('getDashboard');
}

// Transactions
async function getTransactions() {
    return fetchFromAPI('getTransactions');
}

async function addTransaction(transaction) {
    return fetchFromAPI('addTransaction', 'POST', transaction);
}

// Recipes
async function getRecipes() {
    return fetchFromAPI('getRecipes');
}

async function addRecipe(recipe) {
    return fetchFromAPI('addRecipe', 'POST', recipe);
}

// Inventory
async function getInventory() {
    return fetchFromAPI('getInventory');
}

// Production
async function addProduction(production) {
    return fetchFromAPI('addProduction', 'POST', production);
}

// Credits
async function getCredits() {
    return fetchFromAPI('getCredits');
}

// Expenses
async function getExpenses() {
    return fetchFromAPI('getExpenses');
}

// Auth
async function validateToken() {
    return fetchFromAPI('validateToken');
}
