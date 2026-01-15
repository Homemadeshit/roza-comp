import 'dotenv/config'; // Load .env file
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for ESM __dirname
import { AppDataSource } from './db';
import { CustomerController } from './controllers/CustomerController';
import { DictionaryController } from './controllers/DictionaryController';
import { AccountViewService } from './services/AccountViewService';

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors() as any);
app.use(express.json() as any);

// Request Logger (Debug 405 issues)
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.originalUrl}`);
  next();
});

// Initialize Controllers
const customerController = new CustomerController();
const dictionaryController = new DictionaryController();

// --- API Routes ---

// Auth (New)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log(`🔐 Login attempt received for: ${email}`); // Debug log

  // In a full production app, you would check a Users table and hash passwords.
  // For now, we move the check to the backend environment variables to secure it.
  const adminEmail = process.env.ADMIN_EMAIL || 'ppflowers-payments@gmail.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'Test123!#';

  if (email === adminEmail && password === adminPass) {
    console.log('✅ Login successful');
    // Return a mock token for the frontend to store
    return res.json({
      success: true,
      token: 'secure-session-token-' + Date.now(),
      user: { name: 'Finance Admin', email }
    });
  }

  console.log('❌ Login failed: Invalid credentials');
  return res.status(401).json({ success: false, error: 'Invalid credentials provided.' });
});

// --- OAuth Testing Routes (Added for "Option 1" Authorization Code Flow) ---

// 1. Start Flow: Redirects user to AccountView Login
app.get('/api/auth/start', (req, res) => {
  const avService = new AccountViewService(AppDataSource);
  const url = avService.getAuthorizationUrl();
  console.log('🚀 Redirecting user to AccountView OAuth:', url);
  res.redirect(url);
});

// 2. Callback: AccountView redirects here with ?code=...
app.get('/oauth/callback', async (req, res) => {
  const { code } = req.query;

  if (code) {
    /* AUTO-EXCHANGE ENABLED */
    try {
      const avService = new AccountViewService(AppDataSource);
      const tokenData = await avService.exchangeCodeForToken(code as string);

      res.send(`
        <div style="font-family: sans-serif; padding: 2rem;">
          <h1 style="color: #059669;">Authentication Successful!</h1>
          <p>You can now use the API.</p>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
             <strong>Access Token:</strong> ${tokenData.access_token}<br/>
          </div>
        </div>
      `);
    } catch (error) {
      res.status(500).send(`Authentication Failed: ${error.message}`);
    }
  } else {
    res.status(400).send('No code returned from AccountView.');
  }
});

// --- End OAuth Routes ---

// Customers
app.get('/api/customers', (req, res) => customerController.getAll(req, res));
app.get('/api/customers/:id', (req, res) => customerController.getOne(req, res));

// Operations
app.post('/api/sync', (req, res) => customerController.triggerSync(req, res));
app.get('/api/sync', (req, res) => customerController.triggerSync(req, res)); // Allow GET for easy browser testing

// Test Route for AccountViewBusinessObjects
app.get('/api/test/bo/:name', async (req, res) => {
  try {
    const avService = new AccountViewService(AppDataSource);
    const data = await avService.getBusinessObjects(req.params.name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, details: error.response?.data });
  }
});

// Dictionary
app.get('/api/dictionary/tables', (req, res) => dictionaryController.getTables(req, res));
app.get('/api/dictionary/fields', (req, res) => dictionaryController.getFields(req, res));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// --- API FALLBACK (Prevents 405 on POST if route missing) ---
// Use prefix matching '/api' to catch unhandled API requests
app.use('/api', (req, res) => {
  console.log(`⚠️ API Route Not Found: ${req.method} ${req.json ? 'JSON ' : ''}${req.originalUrl}`);
  res.status(404).json({ error: 'API endpoint not found' });
});

// --- STATIC FILES ---
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Using app.use() as a generic fallback for SPA Routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log('💽 Database Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
      console.log(`👉 Test OAuth Flow here: http://localhost:${PORT}/api/auth/start`);
    });

  } catch (error) {
    console.error('Backend Start Error:', error);
  }
}

startServer();