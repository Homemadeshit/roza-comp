import 'dotenv/config'; // Load .env file
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db';
import { CustomerController } from './controllers/CustomerController';

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
    });

  } catch (error) {
    console.error('Backend Start Error:', error);
  }
}

startServer();