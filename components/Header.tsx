import React from 'react';

const Header = () => {
  return (
    <header className="flex-none px-4 md:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950/80 backdrop-blur-md z-20 sticky top-0">
      <div className="flex items-center gap-3">
        {/* Mobile Logo/Title */}
        <div className="lg:hidden flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
             <span className="font-bold text-slate-900 dark:text-white text-sm">PP Flowers</span>
        </div>

        <h2 className="text-lg font-semibold text-slate-800 dark:text-white tracking-tight hidden lg:block">
           Overview
        </h2>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="relative hidden md:block w-64 lg:w-80 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-[20px]">
            search
          </span>
          <input
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-slate-900 dark:text-white transition-all"
            placeholder="Search invoices, customers..."
            type="text"
          />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
             <span className="material-symbols-outlined text-[22px]">search</span>
        </button>

        <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
           <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
        </button>
        <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all">
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;