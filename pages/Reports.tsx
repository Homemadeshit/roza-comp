import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';

const Reports = () => {
    const navigate = useNavigate();

    // --- Calculations ---

    // 1. Aging Buckets
    const aging = {
        '0-30': 0,
        '31-60': 0,
        '61-90': 0,
        '90+': 0
    };

    MOCK_COLLECTIONS_DATA.forEach(customer => {
        customer.invoices.forEach(inv => {
            if (inv.daysOverdue > 0 && inv.openAmount > 0) {
                if (inv.daysOverdue <= 30) aging['0-30'] += inv.openAmount;
                else if (inv.daysOverdue <= 60) aging['31-60'] += inv.openAmount;
                else if (inv.daysOverdue <= 90) aging['61-90'] += inv.openAmount;
                else aging['90+'] += inv.openAmount;
            }
        });
    });

    const totalOverdue = Object.values(aging).reduce((a, b) => a + b, 0);

    // 2. High Risk Customers
    const highRiskCustomers = MOCK_COLLECTIONS_DATA.filter(c => c.risk === 'HIGH');

    // 3. Blocked Customers (Simulated based on Logic, since isBlocked might be false in mock)
    // Let's assume High Risk customers are candidates for blocking.
    const blockedCandidates = highRiskCustomers;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Financial Reports</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Overview of aging, risk, and portfolio health.</p>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Export PDF
                </button>
            </div>

            {/* Aging Analysis Card */}
            <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600">timelapse</span>
                    Aging Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Object.entries(aging).map(([bucket, amount]) => (
                        <div key={bucket} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{bucket} Days</p>
                            <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">€ {amount.toLocaleString()}</p>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${bucket === '90+' ? 'bg-red-500' : 'bg-blue-500'}`}
                                    style={{ width: `${Math.min((amount / totalOverdue) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* High Risk List */}
                <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">warning</span>
                            High Risk Accounts
                        </h2>
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">{highRiskCustomers.length}</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-950/50">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-slate-500">Customer</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500 text-right">Balance</th>
                                    <th className="px-6 py-3 font-semibold text-slate-500 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {highRiskCustomers.map(c => (
                                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{c.companyName}</td>
                                        <td className="px-6 py-4 text-right font-mono">€ {c.currentBalance.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => navigate(`/customers/${c.id}`)}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-xs uppercase tracking-wide"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Quick Links / Blocked Reports */}
                <section className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate('/notifications/blocked')}>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">block</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Blocked Accounts Report</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Detailed view of currently blocked customers and actions required.</p>
                            </div>
                            <span className="material-symbols-outlined ml-auto text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-2xl">payments</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Payments Forecast</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Predicted incoming cash flow for the next 30 days.</p>
                            </div>
                            <span className="material-symbols-outlined ml-auto text-slate-400 group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Reports;
