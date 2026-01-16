import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onLogout }: { onLogout: () => void }) => {
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);
    const navItems = [
        { name: 'Dashboard', icon: 'dashboard', path: '/' },
        { name: 'Collections', icon: 'payments', path: '/collections' },
        { name: 'Customers', icon: 'people', path: '/customers' },
        { name: 'Reports', icon: 'bar_chart', path: '/reports' },
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
                                    `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 ${isActive
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
                <div className="px-2 border-t border-slate-100 dark:border-slate-800 pt-4 relative">
                    {/* Popover Menu */}
                    {showProfileMenu && (
                        <div className="absolute bottom-full left-2 mb-2 w-[calc(100%-1rem)] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-1.5 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
                            <button
                                onClick={() => { setShowProfileMenu(false); onLogout(); }}
                                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                                Sign Out
                            </button>
                        </div>
                    )}

                    <div
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 group"
                    >
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:border-slate-300 transition-colors">
                            <span className="material-symbols-outlined text-[24px]">person</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Admin User</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Finance Manager</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">more_vert</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
