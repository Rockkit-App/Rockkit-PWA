
# Rockkit: Multi-Tenant, Mobile-First PWA for Small Business Manufacturing and Sales

## Overview
Rockkit is a modern, installable Progressive Web App (PWA) for small business management. It supports multiple tenants (companies), each with their own Google Sheet for business data, and a central admin sheet for subscription management. The backend is powered by Google Apps Script, and the frontend is a mobile-first PWA using HTML, Tailwind CSS, and JavaScript.

## Features
- Multi-tenant SaaS: Each company has its own isolated data and users
- Subscription management: Central admin can monitor and manage tenant subscriptions and payments
- User management: Admins and staff roles
- Dashboard: Key business metrics
- Transactions: Sales and purchases
- Production & recipes: Product recipes and manufacturing
- Inventory management: Stock tracking and alerts
- Credit sales & expenses: Track credits and expenses
- Mobile-first, offline-ready PWA

## Tech Stack
- Frontend: HTML, Tailwind CSS, JavaScript (PWA, service worker, manifest)
- Backend: Google Apps Script (API, multi-tenant logic)
- Database: Google Sheets (per-tenant and central admin)
- Authentication: Google OAuth 2.0
- Hosting: GitHub Pages (frontend)

## Getting Started (New User Tutorial)
### 1. Clone the Repository
```sh
git clone <repository-url>
cd smallbiz-pwa
```

### 2. Prepare Google Sheets
- For each company, make a copy of the provided `template.xlsx` (or import to Google Sheets) and name it for the tenant.
- For admin, create a central sheet with `Tenants` and `SubscriptionPayments` sheets for SaaS management.

### 3. Backend Setup
- Open Google Drive > New > Google Apps Script.
- Copy all files from `backend/apps-script/` into the script editor.
- Update `config.gs` with your sheet IDs and company mappings.
- Deploy as Web App (set access to "Anyone, even anonymous").
- Copy the Web App URL.

### 4. Frontend Setup
- Go to `frontend/public/` and open `index.html` in your browser.
- Update `frontend/.env.js` with your backend Web App URL.
- For local dev, use VS Code Live Server or `http-server` to serve the `public` folder.

### 5. Subscription Management (Admin)
- Open `admin-subscriptions.html` for the admin dashboard.
- Add tenants and payments as needed.
- Run `createDailySubscriptionCheckTrigger()` in Apps Script to automate subscription expiry.

### 6. User Guide
- Login with your email and password (set in the Users sheet).
- Use the dashboard, transactions, inventory, and other modules as needed.
- Admins can manage users, subscriptions, and view payment history.

## Deployment
- Host the frontend on GitHub Pages or your preferred static host.
- Use GitHub Actions for CI/CD if desired.

## API Endpoints (Backend)
- `GET /getDashboard`: Dashboard metrics
- `GET /getTransactions`: Transaction records
- `POST /addTransaction`: Add transaction
- `GET /getRecipes`: Product recipes
- `POST /addRecipe`: Add recipe
- `GET /getInventory`: Inventory data
- `POST /addProduction`: Production run
- `GET /getCredits`: Credit sales
- `GET /getExpenses`: Expenses
- `POST /validateToken`: User authentication
- `GET /getTenants`: List tenants (admin)
- `GET /getSubscriptionStatus`: Tenant subscription status
- `POST /addSubscriptionPayment`: Add payment
- `POST /updateSubscriptionStatus`: Update status

## FAQ
**Q: How many Google Sheets do I need?**
A: One per tenant (company) for business data, plus one central admin sheet for subscriptions.

**Q: How do I add a new tenant?**
A: Copy the template sheet, add the company to the admin sheet, and update the backend config.

**Q: How do I automate subscription checks?**
A: Run `createDailySubscriptionCheckTrigger()` in Apps Script once.

## Contributing
Contributions are welcome! Please open an issue or pull request.

## License
MIT License. See LICENSE file for details.