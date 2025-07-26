// This file manages expense logging and categorization.

document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const apiUrl = 'YOUR_API_URL_HERE'; // Replace with your actual API URL

    // Load expenses on page load
    loadExpenses();

    // Event listener for form submission
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(expenseForm);
        const expenseData = {
            date: formData.get('date'),
            category: formData.get('category'),
            amount: parseFloat(formData.get('amount')),
            description: formData.get('description')
        };
        addExpense(expenseData);
    });

    // Function to load expenses
    function loadExpenses() {
        fetch(`${apiUrl}/getExpenses`)
            .then(response => response.json())
            .then(data => {
                expenseList.innerHTML = '';
                data.forEach(expense => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${expense.date} - ${expense.category}: $${expense.amount} - ${expense.description}`;
                    expenseList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error loading expenses:', error));
    }

    // Function to add an expense
    function addExpense(expenseData) {
        fetch(`${apiUrl}/addExpense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadExpenses();
                expenseForm.reset();
            } else {
                console.error('Error adding expense:', data.message);
            }
        })
        .catch(error => console.error('Error adding expense:', error));
    }
});