import React from 'react';
import { NavLink } from 'react-router-dom';

const MobileNav = () => {
  const navItems = [
    { name: 'Home', icon: 'dashboard', path: '/' },
    { name: 'Invoices', icon: 'receipt_long', path: '/disputes/8823' },
    { name: 'Customers', icon: 'people', path: '/customers' },
    { name: 'Reports', icon: 'bar_chart', path: '/notifications/blocked' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 px-4 py-2 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px] ${
              isActive
                ? 'text-blue-500 dark:text-blue-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`
          }
        >
          <span className={`material-symbols-outlined text-[24px] ${item.name === 'Settings' ? '' : 'filled'}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;