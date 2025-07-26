// This file contains functions for making API calls to the Google Apps Script backend.

const API_BASE_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your Google Apps Script Web App URL

async function fetchFromAPI(endpoint, method = 'GET', body = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getAuthToken()}` // Function to get the OAuth token
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
    
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function getDashboard() {
    return fetchFromAPI('getDashboard');
}

async function getTransactions() {
    return fetchFromAPI('getTransactions');
}

async function addTransaction(transaction) {
    return fetchFromAPI('addTransaction', 'POST', transaction);
}

async function getRecipes() {
    return fetchFromAPI('getRecipes');
}

async function addRecipe(recipe) {
    return fetchFromAPI('addRecipe', 'POST', recipe);
}

async function getInventory() {
    return fetchFromAPI('getInventory');
}

async function addProduction(production) {
    return fetchFromAPI('addProduction', 'POST', production);
}

async function getCredits() {
    return fetchFromAPI('getCredits');
}

async function getExpenses() {
    return fetchFromAPI('getExpenses');
}

async function validateToken() {
    return fetchFromAPI('validateToken');
}