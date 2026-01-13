import 'dotenv/config'; // Load .env file
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db';
import { CustomerController } from './controllers/CustomerController';
import { AccountViewService } from './services/AccountViewService';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors() as any); // Allow React Frontend to access this API
app.use(express.json() as any);

// Initialize Controllers
const customerController = new CustomerController();

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
    console.log('✅ OAuth Code Received:', code);
    
    try {
      const avService = new AccountViewService(AppDataSource);
      const tokenData = await avService.exchangeCodeForToken(code as string);
      
      res.send(`
        <div style="font-family: sans-serif; padding: 2rem;">
          <h1 style="color: #059669;">Authentication Successful!</h1>
          <p>The backend has successfully exchanged the authorization code for an access token.</p>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
             <strong>Access Token:</strong> ${tokenData.access_token.substring(0, 15)}...<br/>
             <strong>Expires In:</strong> ${tokenData.expires_in} seconds
          </div>
          <p style="margin-top: 2rem;">You can now close this window or trigger a sync via Postman.</p>
        </div>
      `);
    } catch (error) {
       res.status(500).send(`
         <h1 style="color: #dc2626;">Authentication Failed</h1>
         <p>${error.message}</p>
         <pre>${JSON.stringify(error.response?.data, null, 2)}</pre>
       `);
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

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
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