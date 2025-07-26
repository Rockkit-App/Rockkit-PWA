// This file manages the dashboard functionalities and metrics display.

document.addEventListener('DOMContentLoaded', () => {
    const dashboardMetrics = document.getElementById('dashboard-metrics');
    const salesTrendChart = document.getElementById('sales-trend-chart');

    // Fetch dashboard data
    async function fetchDashboardData() {
        try {
            const response = await fetch('/api/getDashboard');
            const data = await response.json();
            updateDashboard(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }

    // Update dashboard metrics
    function updateDashboard(data) {
        dashboardMetrics.innerHTML = `
            <div>Total Sales: ${data.totalSales}</div>
            <div>Low Inventory Count: ${data.lowInventoryCount}</div>
            <div>Pending Credit Sales: ${data.pendingCreditSales}</div>
            <div>Total Products Manufactured: ${data.totalProductsManufactured}</div>
        `;
        renderSalesTrendChart(data.salesTrend);
    }

    // Render sales trend chart
    function renderSalesTrendChart(salesTrend) {
        const ctx = salesTrendChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesTrend.labels,
                datasets: [{
                    label: 'Sales Trend',
                    data: salesTrend.data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial fetch of dashboard data
    fetchDashboardData();
});