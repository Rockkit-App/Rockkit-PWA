// This file handles credit sales tracking and management.

document.addEventListener('DOMContentLoaded', function() {
    const creditsTable = document.getElementById('credits-table');
    const addCreditForm = document.getElementById('add-credit-form');
    const creditAmountInput = document.getElementById('credit-amount');
    const creditStatusInput = document.getElementById('credit-status');
    const creditDateInput = document.getElementById('credit-date');

    // Fetch and display credits on page load
    fetchCredits();

    // Add credit form submission
    addCreditForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const creditData = {
            amount: creditAmountInput.value,
            status: creditStatusInput.value,
            date: creditDateInput.value
        };
        addCredit(creditData);
    });

    function fetchCredits() {
        // Call the API to get credits
        fetch('/api/getCredits')
            .then(response => response.json())
            .then(data => {
                displayCredits(data);
            })
            .catch(error => console.error('Error fetching credits:', error));
    }

    function displayCredits(credits) {
        creditsTable.innerHTML = ''; // Clear existing table rows
        credits.forEach(credit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${credit.amount}</td>
                <td>${credit.status}</td>
                <td>${credit.date}</td>
            `;
            creditsTable.appendChild(row);
        });
    }

    function addCredit(creditData) {
        // Call the API to add a new credit
        fetch('/api/addCredit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creditData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchCredits(); // Refresh the credits list
                addCreditForm.reset(); // Reset the form
            } else {
                console.error('Error adding credit:', data.message);
            }
        })
        .catch(error => console.error('Error adding credit:', error));
    }
});