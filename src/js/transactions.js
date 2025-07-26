// This file handles transaction recording and filtering.

document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const filterInput = document.getElementById('filter-input');

    // Load transactions on page load
    loadTransactions();

    // Event listener for form submission
    transactionForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(transactionForm);
        const transactionData = {
            transactionId: formData.get('transactionId'),
            date: formData.get('date'),
            type: formData.get('type'),
            productId: formData.get('productId'),
            quantity: formData.get('quantity'),
            totalAmount: formData.get('totalAmount')
        };
        try {
            const result = await addTransaction(transactionData);
            if (result.success) {
                loadTransactions();
                transactionForm.reset();
            } else {
                alert(result.message || 'Failed to add transaction.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Event listener for filtering transactions
    filterInput.addEventListener('input', function() {
        filterTransactions(filterInput.value);
    });

    async function loadTransactions() {
        try {
            const result = await window.getTransactions();
            if (result.success) {
                renderTransactions(result.data);
            } else {
                alert(result.message || 'Failed to load transactions.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    // Use central API utility
    async function addTransaction(transactionData) {
        return await window.addTransaction(transactionData);
    }

    function renderTransactions(transactions) {
        transactionList.innerHTML = '';
        transactions.forEach(tx => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tx.transactionId}</td>
                <td>${tx.date}</td>
                <td>${tx.type}</td>
                <td>${tx.productId}</td>
                <td>${tx.quantity}</td>
                <td>${tx.totalAmount}</td>
            `;
            transactionList.appendChild(row);
        });
    }

    function filterTransactions(query) {
        const items = transactionList.getElementsByTagName('li');
        Array.from(items).forEach(item => {
            if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
});