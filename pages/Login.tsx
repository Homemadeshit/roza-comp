import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await onLogin(email, password);
    
    if (!result.success) {
      setError(result.error || 'Invalid credentials.');
      setIsSubmitting(false);
    }
    // If success, parent handles the loader state
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E8E8E8] dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 animate-in fade-in zoom-in duration-300">
        
        <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 mb-4">
              <span className="material-symbols-outlined text-[32px]">account_balance_wallet</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">PP Flowers Payments</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Sign in to access financial dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors material-symbols-outlined text-[20px]">mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="ppflowers-payments@gmail.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
             <div className="flex justify-between ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</a>
             </div>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors material-symbols-outlined text-[20px]">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? (
                 <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
            ) : (
                <>
                    <span>Sign In</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">Protected by FreshPortal Secure Login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
