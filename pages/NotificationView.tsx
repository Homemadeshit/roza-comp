import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';

const NotificationView = () => {
  const { id } = useParams();

  // Logic: If ID is 'blocked', find the first High Risk customer to demo. 
  // Otherwise find by ID.
  const customer = id === 'blocked'
    ? MOCK_COLLECTIONS_DATA.find(c => c.risk === 'HIGH')
    : MOCK_COLLECTIONS_DATA.find(c => c.id === id);

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">No blocked customer found.</h2>
        <Link to="/" className="text-blue-500 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  const overdueInvoices = customer.invoices.filter(i => i.daysOverdue > 0);
  const creditUsagePercent = Math.min(Math.round((customer.currentBalance / customer.creditLimit) * 100), 100);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-6 pb-20">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 items-center text-sm font-medium">
        <Link className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors" to="/">Home</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <Link className="text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors" to="/customers">Accounts</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-900 dark:text-white">Notification</span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Notification: Customer Blocked</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-500/30 uppercase tracking-wide">Action Required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>Triggered today at 09:42 AM by System Rule #402</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">history</span> Audit Log
            </button>
            <button className="h-9 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">snooze</span> Snooze (24h)
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xl text-slate-600 dark:text-slate-300">
                    {customer.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{customer.companyName}</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">ID: {customer.accountViewId}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5 font-medium uppercase">Outstanding</div>
                  <div className="font-bold text-slate-900 dark:text-white text-lg">€{customer.currentBalance.toLocaleString()}</div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">block</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Block Activated</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Credit hold applied immediately. New orders paused. Existing "Shipping" orders are unaffected.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl border border-transparent dark:border-slate-800 p-4 flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Account Manager</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-200">SJ</div>
                <span className="font-semibold text-slate-900 dark:text-white">Sarah Jenkins</span>
              </div>
            </div>
          </div>

          {/* Middle Column - Risk Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm lg:col-span-1 flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="material-symbols-outlined text-amber-500">analytics</span>
              <h3 className="font-bold text-slate-900 dark:text-white">Risk Analysis</h3>
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Credit Limit Usage</span>
                  <span className="text-sm font-bold text-red-600">{creditUsagePercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full transition-all" style={{ width: `${creditUsagePercent}%` }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Current: €{customer.currentBalance.toLocaleString()}</span>
                  <span>Limit: €{customer.creditLimit.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                <span className="material-symbols-outlined text-red-500 mt-0.5 text-[20px]">warning</span>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Severe Delinquency</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{overdueInvoices.length} invoices are currently overdue.</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-transparent mt-auto">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-[20px]">trending_down</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Score</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900/50 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">58/100</span>
              </div>
            </div>
          </div>

          {/* Right Column - Recommendation */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-500/30 p-0 shadow-md shadow-blue-500/5 dark:shadow-none flex flex-col relative overflow-hidden h-full ring-1 ring-blue-100 dark:ring-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <div className="p-6 pb-0 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">Recommendation</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                The system suggests offering a <strong>short-term payment plan</strong>. This allows the customer to resume shipping immediately while committing to a structured recovery schedule.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/40 p-5 border-t border-slate-100 dark:border-slate-800 space-y-3 mt-auto">
              <Link to={`/customers/${customer.id}`} className="group w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm shadow-blue-500/20 transition-all">
                <span>Contact Customer</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </Link>
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="flex-shrink-0 mx-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or</span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors text-sm">
                Override & Unblock
              </button>
            </div>
          </div>
        </div>

        {/* Contributing Invoices Table */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Contributing Overdue Invoices</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All History</button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
                <thead className="bg-slate-50 dark:bg-slate-950/50 text-xs uppercase text-slate-700 dark:text-slate-300 tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3">Invoice #</th>
                    <th className="px-6 py-3">Date Issued</th>
                    <th className="px-6 py-3">Due Date</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3 text-center">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {overdueInvoices.length > 0 ? overdueInvoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">#{inv.invoiceNumber}</td>
                      <td className="px-6 py-4">{inv.issueDate}</td>
                      <td className="px-6 py-4">{inv.dueDate}</td>
                      <td className="px-6 py-4 text-right text-slate-900 dark:text-white font-medium">€{inv.openAmount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-md bg-red-50 dark:bg-red-400/10 px-2 py-1 text-xs font-bold text-red-700 dark:text-red-400 ring-1 ring-inset ring-red-600/10 dark:ring-red-400/20">{inv.daysOverdue} Days Overdue</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-500 dark:hover:text-white font-medium text-sm transition-colors">View</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">No overdue invoices found for this flagged account? (Check data)</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationView;