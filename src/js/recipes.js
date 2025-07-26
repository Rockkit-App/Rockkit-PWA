// This file handles recipe management functionalities.

document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');

    // Fetch and display recipes on page load
    fetchRecipes();

    // Event listener for recipe form submission
    recipeForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const recipeId = document.getElementById('recipe-id').value;
        const productId = document.getElementById('product-id').value;
        const ingredient = document.getElementById('ingredient').value;
        const quantity = document.getElementById('quantity').value;
        const recipeData = {
            recipeId,
            productId,
            ingredient,
            quantity
        };
        try {
            const result = await addRecipe(recipeData);
            if (result.success) {
                fetchRecipes();
                recipeForm.reset();
            } else {
                alert(result.message || 'Failed to add recipe.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    async function fetchRecipes() {
        try {
            const result = await window.getRecipes();
            if (result.success) {
                displayRecipes(result.data);
            } else {
                alert(result.message || 'Failed to load recipes.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = `ID: ${recipe.recipeId}, Product: ${recipe.productId}, Ingredient: ${recipe.ingredient}, Quantity: ${recipe.quantity}`;
            recipeList.appendChild(li);
        });
    }

    // Use central API utility
    async function addRecipe(recipeData) {
        return await window.addRecipe(recipeData);
    }
});