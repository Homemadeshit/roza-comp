import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Loader from './components/Loader';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';

import NotificationView from './pages/NotificationView';
import DisputeDetail from './pages/DisputeDetail';
import SystemSettings from './pages/SystemSettings';
import { api } from './utils/api'; // Use centralized API
import CollectionsDashboard from './pages/CollectionsDashboard';
import Reports from './pages/Reports';

const Layout: React.FC<{ children: React.ReactNode; onLogout: () => void }> = ({ children, onLogout }) => {
  return (
    <div className="flex h-screen w-full bg-[#E8E8E8] dark:bg-slate-950">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 relative">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/collections" element={<CollectionsDashboard />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
      <Route path="/collections/customer/:id" element={<CustomerDetail />} />
      <Route path="/notifications/:id" element={<NotificationView />} />
      <Route path="/disputes/:id" element={<DisputeDetail />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<SystemSettings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Call the API (Real or Mock via interceptor)
      const response = await api.post('/login', { email, password: pass });

      if (response.data.success) {
        setIsLoading(true);
        // Simulate loading heavy app data
        setTimeout(() => {
          localStorage.setItem('isAuthenticated', 'true');
          setIsAuthenticated(true);
          setIsLoading(false);
        }, 1500);
        return { success: true };
      }
      return { success: false, error: 'Unexpected response from server' };
    } catch (error: any) {
      console.error("Login Error", error);

      let errorMessage = 'Login failed. Please try again.';

      if (error.response) {
        // Server responded with an error (e.g. 401 Invalid Credentials)
        errorMessage = error.response.data.error || `Server Error: ${error.response.status}`;
      } else {
        // Fallback for other errors
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout onLogout={handleLogout}>
        <AppRoutes />
      </Layout>
    </HashRouter>
  );
}
