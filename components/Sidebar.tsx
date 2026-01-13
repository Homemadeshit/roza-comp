import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Invoices', icon: 'receipt_long', path: '/disputes/8823' }, // Linking to dispute for demo
    { name: 'Customers', icon: 'people', path: '/customers' },
    { name: 'Reports', icon: 'bar_chart', path: '/notifications/blocked' }, // Linking to notification for demo
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-30">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-slate-900 dark:text-white">PP Flowers payments</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Finance Team</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <span className={`material-symbols-outlined text-[22px] ${item.name === 'Settings' ? '' : 'filled'}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="px-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">System Online</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[98%]"></div>
                </div>
            </div>
          <button className="flex items-center gap-3 px-3 py-2 w-full mt-1 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;