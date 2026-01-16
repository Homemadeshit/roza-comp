import { useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';

const Header = () => {
  const navigate = useNavigate();
  const highRiskCount = MOCK_COLLECTIONS_DATA.filter(c => c.risk === 'HIGH').length;

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

        <button
          onClick={() => navigate('/notifications/blocked')}
          className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          title="View Critical Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {highRiskCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-4 w-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-900 shadow-sm animate-pulse">
              {highRiskCount}
            </span>
          )}
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