import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import our serverless handlers for local development
import priceHandler from './api/price.js';
import newsHandler from './api/news.js';
import inventoryHandler from './api/inventory.js';
import articleHandler from './api/article.js';

const app = express();
const port = 3000;

// Middleware
app.use(helmet()); // Basic security
app.use(cors());

// --- LOCAL DEV WRAPPERS ---
// Vercel Serverless Functions use (req, res) identical to Express
app.get('/api/price', async (req, res) => await priceHandler(req, res));
app.get('/api/news', async (req, res) => await newsHandler(req, res));
app.get('/api/inventory', async (req, res) => await inventoryHandler(req, res));
app.get('/api/article', async (req, res) => await articleHandler(req, res));

app.listen(port, () => {
  console.log(`🚀 Local dev proxy running at http://localhost:${port}`);
  console.log(`Backend is now simulating Vercel Serverless Architecture`);
});
