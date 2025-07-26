// admin-subscriptions.js
// Fetch and display tenants
async function fetchTenants() {
  const res = await fetch('/getTenants');
  const data = await res.json();
  const tbody = document.getElementById('tenants-table');
  tbody.innerHTML = '';
  if (data.success) {
    data.data.slice(1).forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="border px-4 py-2">${row[1]}</td>
        <td class="border px-4 py-2">${row[3]}</td>
        <td class="border px-4 py-2">${row[4]}</td>
        <td class="border px-4 py-2">${row[6]}</td>
        <td class="border px-4 py-2">
          <button onclick="updateStatus('${row[0]}')" class="text-blue-600 underline">Update</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// Add payment form handler
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', async e => {
  e.preventDefault();
  const payment = {
    paymentId: Date.now().toString(),
    date: new Date().toISOString().slice(0,10),
    amount: document.getElementById('amount').value,
    method: document.getElementById('method').value,
    status: 'Paid',
    transactionRef: document.getElementById('transactionRef').value,
    endDate: document.getElementById('endDate').value
  };
  const companyId = document.getElementById('companyId').value;
  const res = await fetch('/addSubscriptionPayment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payment, companyId })
  });
  const result = await res.json();
  alert(result.success ? 'Payment added!' : 'Error adding payment');
  fetchTenants();
});

// Update status (simple prompt for demo)
window.updateStatus = async function(companyId) {
  const status = prompt('Enter new status (Active/Expired):');
  const endDate = prompt('Enter new end date (YYYY-MM-DD):');
  const res = await fetch('/updateSubscriptionStatus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ companyId, status, endDate })
  });
  const result = await res.json();
  alert(result.success ? 'Status updated!' : 'Error updating status');
  fetchTenants();
};

// Initial load
fetchTenants();
