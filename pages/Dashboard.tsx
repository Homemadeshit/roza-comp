import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';
import ReminderModal from '../components/ReminderModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);

  // State for Sorting & Filtering
  const [sortBy, setSortBy] = React.useState<'urgency' | 'balance' | 'name'>('urgency');
  const [filterType, setFilterType] = React.useState<'all' | 'high_risk' | 'overdue'>('all');

  // KPI Calculations
  const totalCustomers = MOCK_COLLECTIONS_DATA.length;
  const highRiskCount = MOCK_COLLECTIONS_DATA.filter(c => c.risk === 'HIGH').length;
  const goodStandingCount = totalCustomers - highRiskCount;

  const percentGood = Math.round((goodStandingCount / totalCustomers) * 100);
  const percentRisk = Math.round((highRiskCount / totalCustomers) * 100);

  // Action Items Logic: Filter -> Sort
  const actionItems = React.useMemo(() => {
    // 1. Base Criteria: High Risk OR Overdue
    let items = MOCK_COLLECTIONS_DATA.filter(c => {
      const isOverdue = c.invoices.some(i => i.daysOverdue > 0);
      return c.risk === 'HIGH' || isOverdue;
    });

    // 2. Apply User Filter
    if (filterType === 'high_risk') {
      items = items.filter(c => c.risk === 'HIGH');
    } else if (filterType === 'overdue') {
      items = items.filter(c => c.invoices.some(i => i.daysOverdue > 0));
    }

    // 3. Apply Sorting
    return items.sort((a, b) => {
      if (sortBy === 'balance') {
        return b.currentBalance - a.currentBalance;
      } else if (sortBy === 'name') {
        return a.companyName.localeCompare(b.companyName);
      } else {
        // Urgency: High Risk first, then Overdue Days (Mock approx)
        if (a.risk === 'HIGH' && b.risk !== 'HIGH') return -1;
        if (a.risk !== 'HIGH' && b.risk === 'HIGH') return 1;
        return b.currentBalance - a.currentBalance; // Fallback to balance
      }
    });

  }, [sortBy, filterType]);

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Accounts Receivable</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-36 hover:shadow-lg transition-all duration-300 group">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">In Good Standing</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{percentGood}%</h3>
              <span className="text-emerald-500 text-xs font-medium flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px] mr-1">check_circle</span> {goodStandingCount} Clients
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${percentGood}%` }}></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-36 hover:shadow-lg transition-all duration-300 group">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Direct Debit Active</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">75%</h3>
              <span className="text-blue-500 text-xs font-medium flex items-center bg-blue-500/10 px-1.5 py-0.5 rounded">
                Stable
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[75%] group-hover:bg-blue-400 transition-colors"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-900 rounded-xl border border-red-100 dark:border-red-900/30 p-6 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 cursor-pointer" onClick={() => navigate('/collections')}>
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <span className="material-symbols-outlined text-red-600 text-8xl">gpp_bad</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">High Risk / Overdue</p>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-red-700 dark:text-red-400">{percentRisk}%</h3>
              <span className="text-red-600 dark:text-red-400 text-xs font-medium flex items-center bg-red-500/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px] mr-1">warning</span> {highRiskCount} Client
              </span>
            </div>
          </div>
          <div className="w-full bg-red-100 dark:bg-red-900/30 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${percentRisk}%` }}></div>
          </div>
        </div>
      </section>

      {/* Action Table */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
            ACTION REQUIRED
            <span className="bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-200 dark:border-red-500/20">{actionItems.length} Priority</span>
          </h2>
          <div className="flex gap-2">
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer appearance-none"
              >
                <option value="all">All Issues</option>
                <option value="high_risk">High Risk Only</option>
                <option value="overdue">Overdue Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer appearance-none"
              >
                <option value="urgency">Sort: Urgency</option>
                <option value="balance">Sort: Balance (High-Low)</option>
                <option value="name">Sort: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[25%]">Customer</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Outstanding</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[15%]">Flag</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {actionItems.map(customer => (
                  <tr key={customer.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate(`/collections/customer/${customer.id}`)}>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-500 transition-colors">{customer.companyName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ID: {customer.accountViewId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Overdue Invoices</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 ml-6.5 mt-0.5 pl-6.5">Multiple items pending</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">€{customer.currentBalance.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        High Risk
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCustomer(customer);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded transition-all flex items-center ml-auto"
                      >
                        <span className="material-symbols-outlined text-[16px] mr-1">send</span> Send Reminder
                      </button>
                    </td>
                  </tr>
                ))}

                {actionItems.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-emerald-500 mb-2">check_circle</span>
                        <p>All items in good standing!</p>
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default Dashboard;