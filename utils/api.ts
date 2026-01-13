import axios from 'axios';

// --- MOCK DATA ---
const MOCK_CUSTOMERS = [
  {
    id: '1',
    companyName: 'Acme Corp',
    accountViewId: '88392',
    email: 'accounts@acme.com',
    creditLimit: 50000,
    currentBalance: 56500, // Overdue
    maxPaymentDays: 30,
    isBlockedLocally: true,
  },
  {
    id: '2',
    companyName: 'Globex Inc.',
    accountViewId: '10293',
    email: 'finance@globex.com',
    creditLimit: 20000,
    currentBalance: 4200,
    maxPaymentDays: 45,
    isBlockedLocally: false,
  },
  {
    id: '3',
    companyName: 'Soylent Corp',
    accountViewId: '44512',
    email: 'pay@soylent.com',
    creditLimit: 10000,
    currentBalance: 0,
    maxPaymentDays: 15,
    isBlockedLocally: false,
  },
  {
    id: '4',
    companyName: 'Stark Industries',
    accountViewId: '10294',
    email: 'pepper@stark.com',
    creditLimit: 1000000,
    currentBalance: 56000,
    maxPaymentDays: 60,
    isBlockedLocally: false,
  },
  {
    id: '5',
    companyName: 'Wayne Enterprises',
    accountViewId: '77211',
    email: 'fox@wayne.com',
    creditLimit: 500000,
    currentBalance: 1250,
    maxPaymentDays: 30,
    isBlockedLocally: false,
  }
];

const MOCK_INVOICES = [
    { id: '101', invoiceNumber: 'INV-2023-001', amount: 12450.00, paidAmount: 0, issueDate: '2023-10-12', dueDate: '2023-11-12', status: 'OVERDUE' },
    { id: '102', invoiceNumber: 'INV-2023-045', amount: 3200.00, paidAmount: 0, issueDate: '2023-10-20', dueDate: '2023-11-20', status: 'OVERDUE' },
    { id: '103', invoiceNumber: 'INV-2023-099', amount: 5600.00, paidAmount: 5600.00, issueDate: '2023-09-01', dueDate: '2023-10-01', status: 'PAID' },
    { id: '104', invoiceNumber: 'INV-2023-102', amount: 450.00, paidAmount: 0, issueDate: '2023-11-01', dueDate: '2023-12-01', status: 'OPEN' },
];

// Create a centralized Axios instance
const API_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle errors and fallback to mocks if server is down
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a network error (server down or unreachable)
    if (!error.response) {
      console.warn('⚠️ Backend unreachable (Network Error). Switching to Offline Mock Mode.');
      
      const url = error.config.url;

      // 1. Mock Login
      if (url?.includes('/login')) {
         return new Promise((resolve) => {
             setTimeout(() => {
                 resolve({ 
                     data: { 
                         success: true, 
                         token: 'mock-offline-token', 
                         user: { name: 'Demo Admin', email: 'admin@demo.local' } 
                     } 
                 });
             }, 800); // Simulate network latency
         });
      }

      // 2. Mock Customer List
      if (url?.endsWith('/customers')) {
          return Promise.resolve({ data: MOCK_CUSTOMERS });
      }

      // 3. Mock Customer Detail (regex for /customers/:id)
      if (url?.match(/\/customers\/[^/]+$/)) {
          // Try to find by ID, otherwise return the first one as fallback
          const id = url.split('/').pop();
          const mockCustomer = MOCK_CUSTOMERS.find(c => c.id === id) || MOCK_CUSTOMERS[0];
          
          return Promise.resolve({ 
              data: { 
                  ...mockCustomer, 
                  invoices: MOCK_INVOICES 
              } 
          });
      }

      // 4. Mock Sync Operation
      if (url?.includes('/sync')) {
          return new Promise((resolve) => {
              setTimeout(() => {
                   resolve({ data: { message: 'Mock Sync Successful' } });
              }, 2000);
          });
      }
    }

    // If it's a real API error from the server (e.g., 401 Invalid Creds), pass it through
    console.error('API Call Failed:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);
