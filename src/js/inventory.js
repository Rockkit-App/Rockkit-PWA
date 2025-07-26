// inventory.js

document.addEventListener('DOMContentLoaded', function() {
    const inventoryTable = document.getElementById('inventory-table');
    const addInventoryForm = document.getElementById('add-inventory-form');
    const apiUrl = 'YOUR_API_URL_HERE'; // Replace with your actual API URL

    // Fetch inventory data on page load
    fetchInventory();

    // Function to fetch inventory data
    async function fetchInventory() {
        try {
            const result = await window.getInventory();
            if (result.success) {
                populateInventoryTable(result.data);
            } else {
                alert(result.message || 'Failed to load inventory.');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    // Function to populate inventory table
    function populateInventoryTable(data) {
        inventoryTable.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.productId}</td>
                <td>${item.stockLevel}</td>
                <td>${item.reorderLevel}</td>
                <td><button class="delete-btn" data-id="${item.productId}">Delete</button></td>
            `;
            inventoryTable.appendChild(row);
        });
        attachDeleteEvent();
    }

    // Function to attach delete event to buttons
    function attachDeleteEvent() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteInventoryItem(id);
            });
        });
    }

    // Function to delete inventory item
    function deleteInventoryItem(id) {
        fetch(`${apiUrl}/deleteInventoryItem`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        })
        .then(response => response.json())
        .then(data => {
            fetchInventory(); // Refresh inventory after deletion
        })
        .catch(error => console.error('Error deleting inventory item:', error));
    }

    // Event listener for adding new inventory item
    addInventoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(addInventoryForm);
        const newItem = {
            productName: formData.get('productName'),
            quantity: formData.get('quantity'),
            reorderLevel: formData.get('reorderLevel'),
        };

        fetch(`${apiUrl}/addInventoryItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem)
        })
        .then(response => response.json())
        .then(data => {
            fetchInventory(); // Refresh inventory after adding
            addInventoryForm.reset(); // Reset form
        })
        .catch(error => console.error('Error adding inventory item:', error));
    });
});