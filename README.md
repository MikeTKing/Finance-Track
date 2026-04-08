# 💸 Finance Tracker

A full-stack personal finance tracking application built with **TypeScript**, **React**, **Node.js**, and **Express**, deployable on **Vercel**.

## Features

- 📊 **Dashboard** - View total balance, income, expenses, and transaction count
- ➕ **Add Transactions** - Create income and expense entries with categories
- 🔍 **Filter & Search** - Filter by type, category, or search by title
- 📈 **Spending Chart** - Visual breakdown of expenses by category (pie chart)
- 🗑️ **Delete Transactions** - Remove entries with confirmation
- 🌙 **Dark Mode UI** - Modern, clean dark theme

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (build tool)
- Axios (HTTP client)
- Recharts (data visualization)
- CSS Variables (styling)

### Backend
- Node.js + Express
- TypeScript
- In-memory data store (replace with database for production)
- CORS enabled

## Project Structure

```
finance-tracker/
├── api/                    # Backend API
│   ├── src/
│   │   ├── index.ts        # Express server entry
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── store.ts        # In-memory data store
│   │   └── routes/
│   │       └── transactions.ts  # API routes
│   ├── package.json
│   └── tsconfig.json
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.ts          # API client
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.ts
├── vercel.json             # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ (tested with v24)
- npm or yarn

### Local Development

1. **Clone and install dependencies:**

```bash
cd finance-tracker

# Install API dependencies
cd api
npm install

# Install client dependencies
cd ../client
npm install
```

2. **Start the backend API:**

```bash
cd api
npm run dev
# Server runs at http://localhost:4000
```

3. **Start the frontend (in a new terminal):**

```bash
cd client
npm run dev
# App runs at http://localhost:5173
```

4. **Open your browser** to `http://localhost:5173`

### Build for Production

```bash
# Build API
cd api
npm run build

# Build Client
cd client
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/transactions` | Get all transactions (with optional filters) |
| GET | `/api/transactions/summary` | Get financial summary |
| GET | `/api/transactions/breakdown` | Get expense breakdown by category |
| GET | `/api/transactions/:id` | Get single transaction |
| POST | `/api/transactions` | Create new transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Query Parameters for GET /api/transactions

- `type` - Filter by 'income' or 'expense'
- `category` - Filter by category (salary, food, etc.)
- `search` - Search in title and notes
- `startDate` - Filter from date (YYYY-MM-DD)
- `endDate` - Filter to date (YYYY-MM-DD)

## Deploying to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/finance-tracker)

### Manual Deployment

1. **Install Vercel CLI:**

```bash
npm install -g vercel
```

2. **Login to Vercel:**

```bash
vercel login
```

3. **Deploy:**

```bash
cd finance-tracker
vercel --prod
```

### Deploying API Separately

You can deploy the API and frontend separately:

1. **Deploy API:**

```bash
cd api
vercel --prod
```

2. **Update frontend API URL:**

Create `client/.env.local`:
```
VITE_API_URL=https://your-api.vercel.app
```

3. **Deploy frontend:**

```bash
cd client
vercel --prod
```

## Environment Variables

### Frontend (.env.local)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000` |

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |
| `CLIENT_URL` | CORS allowed origin | `http://localhost:5173` |

## Future Improvements

- [ ] Add user authentication (JWT)
- [ ] Connect to a real database (PostgreSQL/MongoDB)
- [ ] Add data export (CSV/PDF)
- [ ] Implement recurring transactions
- [ ] Add budget goals and alerts
- [ ] Multi-currency support
- [ ] Mobile-responsive improvements
- [ ] Unit and integration tests

## License

MIT