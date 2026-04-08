import express from 'express';
import cors from 'cors';
import transactionsRouter from './routes/transactions';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Finance Tracker API is running 🚀', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/transactions', transactionsRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ API server running at http://localhost:${PORT}`);
  console.log(`📊 Finance Tracker API ready`);
});

export default app;
