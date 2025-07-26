// This file manages production runs and recipe selections.

document.addEventListener('DOMContentLoaded', function() {
    const productionForm = document.getElementById('production-form');
    const recipeSelect = document.getElementById('recipe-select');
    const quantityInput = document.getElementById('quantity-input');
    const productionList = document.getElementById('production-list');

    // Fetch recipes from the API and populate the recipe select dropdown
    async function fetchRecipes() {
        try {
            const response = await fetch('/api/getRecipes');
            const recipes = await response.json();
            recipes.forEach(recipe => {
                const option = document.createElement('option');
                option.value = recipe.id;
                option.textContent = recipe.name;
                recipeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }

    // Handle production form submission
    productionForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const recipeId = recipeSelect.value;
        const quantity = quantityInput.value;

        if (!recipeId || !quantity) {
            alert('Please select a recipe and enter a quantity.');
            return;
        }

        try {
            const response = await fetch('/api/addProduction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipeId, quantity }),
            });

            if (response.ok) {
                const productionData = await response.json();
                displayProduction(productionData);
                productionForm.reset();
            } else {
                alert('Failed to add production. Please try again.');
            }
        } catch (error) {
            console.error('Error adding production:', error);
        }
    });

    // Display production runs in the list
    function displayProduction(data) {
        const listItem = document.createElement('li');
        listItem.textContent = `Produced ${data.quantity} of recipe ID ${data.recipeId}`;
        productionList.appendChild(listItem);
    }

    // Initialize the app
    fetchRecipes();
});