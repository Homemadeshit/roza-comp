import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Accounts Receivable</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Overview for Monday, Oct 24</p>
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
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">94%</h3>
              <span className="text-emerald-500 text-xs font-medium flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> 1.2%
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-[94%] group-hover:bg-emerald-400 transition-colors"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between h-36 hover:shadow-lg transition-all duration-300 group">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">On Payment Plan</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">4%</h3>
              <span className="text-blue-500 text-xs font-medium flex items-center bg-blue-500/10 px-1.5 py-0.5 rounded">
                Stable
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full w-[4%] group-hover:bg-blue-400 transition-colors"></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-900 rounded-xl border border-red-100 dark:border-red-900/30 p-6 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 cursor-pointer" onClick={() => navigate('/notifications/blocked')}>
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <span className="material-symbols-outlined text-red-600 text-8xl">gpp_bad</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Blocked Automatically</p>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold text-red-700 dark:text-red-400">2%</h3>
              <span className="text-red-600 dark:text-red-400 text-xs font-medium flex items-center bg-red-500/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> 0.5%
              </span>
            </div>
          </div>
          <div className="w-full bg-red-100 dark:bg-red-900/30 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full w-[35%] group-hover:bg-red-400 transition-colors"></div>
          </div>
        </div>
      </section>

      {/* Action Table */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
            ACTION REQUIRED
            <span className="bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-200 dark:border-red-500/20">5 Priority</span>
          </h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                 <span className="material-symbols-outlined text-[16px]">filter_list</span> Filters
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined text-[16px]">sort</span> Sort by: Urgency
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[25%]">Customer</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Issue</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Outstanding</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[15%]">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                
                {/* Row 1 */}
                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => navigate('/customers/acme-corp')}>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-500 transition-colors">Acme Corp Ltd.</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ID: #94021</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-500 text-[18px]">credit_card_off</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Payment Failed</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 ml-6.5 mt-0.5 pl-6.5">Last attempt 2h ago</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">$12,450.00</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      Urgent
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded transition-all">
                      Resolve Now
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">Globex Inc.</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ID: #88210</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500 text-[18px]">event_busy</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Card Expired</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-6.5 mt-0.5">Exp: 10/24</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">$4,200.00</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      Pending
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded transition-all">
                      Update Method
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" onClick={() => navigate('/disputes/8823')}>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-500 transition-colors">Stark Industries</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ID: #10294</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-[18px]">gavel</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Invoice Dispute</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-6.5 mt-0.5">Inv #9923</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">$56,000.00</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      Review
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded transition-all">
                      View Details
                    </button>
                  </td>
                </tr>

                 {/* Row 4 */}
                 <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">Wayne Enterprises</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ID: #77211</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">verified_user</span>
                      <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Tax Info Missing</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pl-6.5 mt-0.5">Required for FY24</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-mono text-sm font-medium text-slate-400">-</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      Compliance
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded transition-all">
                      Request Info
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <button className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
              View all 12 exceptions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;