import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-slate-950 z-50 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-32 w-32 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
        {/* Spinning Ring */}
        <div className="absolute h-32 w-32 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        {/* Logo in middle */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
             <img 
                src="https://pp-flowers.sirv.com/logo%20(2).png" 
                alt="PP Flowers Logo" 
                className="w-full h-full object-contain"
             />
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">PP Flowers</h2>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Loading Financial Data</span>
            <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-1 w-1 rounded-full bg-slate-400 animate-bounce"></span>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;