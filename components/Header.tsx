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


      </div>
      <div className="flex items-center gap-3 md:gap-4">

        <button
          onClick={() => navigate('/notifications/blocked')}
          className="relative p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          title="View Critical Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          {highRiskCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 h-5 w-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 shadow-md">
              {highRiskCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
};

export default Header;