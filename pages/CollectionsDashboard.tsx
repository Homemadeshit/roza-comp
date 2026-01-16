import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const CollectionsDashboard: React.FC = () => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'ACTION' | 'HIGH_RISK'>('ALL');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error("Failed to fetch collections data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Logic to filter data
    const filteredData = customers.filter(customer => {
        const isHighRisk = customer.risk === 'HIGH';
        const hasOverdue = customer.invoices?.some((i: any) => i.daysOverdue > 0 || (new Date(i.dueDate) < new Date() && i.openAmount > 0));
        const hasBalance = customer.invoices?.reduce((sum: number, i: any) => sum + i.openAmount, 0) > 0;

        // Mock directDebit for now as it might not be in the API yet, assume false or check later
        const directDebit = false;

        if (filter === 'ALL') return true;
        // High Risk filter now catches anyone with overdue invoices OR explicit High Risk flag
        if (filter === 'HIGH_RISK') return isHighRisk || hasOverdue;
        if (filter === 'ACTION') return isHighRisk || hasOverdue || (!directDebit && hasBalance);
        return true;
    });

    // Calculate Totals
    const totalOpen = customers.reduce((sum, c) => {
        const customerBalance = c.invoices?.reduce((isum: number, i: any) => isum + i.openAmount, 0) || 0;
        return sum + customerBalance;
    }, 0);

    const totalOverdue = customers.reduce((sum, c) => {
        const overdueInvoices = c.invoices?.filter((i: any) => i.daysOverdue > 0 || (new Date(i.dueDate) < new Date() && i.openAmount > 0));
        return sum + (overdueInvoices?.reduce((isum: number, i: any) => isum + i.openAmount, 0) || 0);
    }, 0);

    // Count of High Risk or Overdue customers
    const highRiskCount = customers.filter(c => {
        const hasOverdue = c.invoices?.some((i: any) => i.daysOverdue > 0 || (new Date(i.dueDate) < new Date() && i.openAmount > 0));
        return c.risk === 'HIGH' || hasOverdue;
    }).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600">account_balance_wallet</span>
                        Collections Dashboard
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time AR overview • Updated just now</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('ALL')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'ALL' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        All Debtors
                    </button>
                    <button
                        onClick={() => setFilter('HIGH_RISK')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'HIGH_RISK' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                        High Risk ({highRiskCount})
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Open AR</p>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">€{totalOpen.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</h2>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 bg-red-500 h-full"></div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">Total Overdue</p>
                    <h2 className="text-3xl font-bold text-red-600">€{totalOverdue.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</h2>
                    <p className="text-xs text-red-500/80 mt-1">Requires immediate attention</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-blue-500/20 text-white">
                    <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">Collection Efficiency</p>
                    <h2 className="text-3xl font-bold">94.2%</h2>
                    <p className="text-xs text-blue-100/80 mt-1">On track for monthly goal</p>
                </div>
            </div>

            {/* Customer List */}
            <div className="space-y-4">
                {filteredData.map(customer => {
                    const customerBalance = customer.invoices?.reduce((sum: number, i: any) => sum + i.openAmount, 0) || 0;
                    const hasOverdue = customer.invoices?.some((i: any) => i.daysOverdue > 0 || (new Date(i.dueDate) < new Date() && i.openAmount > 0));

                    // Only show customers with balance or high risk in this view usually, but we abide by filter
                    // If filter is ALL, we might still want to hide those with 0 balance IF we had too many, to focus on debt. 
                    // But user wants to see "what I uploaded", so showing all is safer.
                    if (filter !== 'ALL' && customerBalance <= 0 && customer.risk !== 'HIGH') return null;

                    return (
                        <div key={customer.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-all hover:shadow-md">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{customer.companyName}</h3>
                                        {(customer.risk === 'HIGH' || hasOverdue) && (
                                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">warning</span> {customer.risk === 'HIGH' ? 'High Risk' : 'Overdue'}
                                            </span>
                                        )}
                                        {/* Mock Direct Debit Flag */}
                                        {false && (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">autorenew</span> Auto-Collect
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">ID: {customer.accountViewId} • {customer.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Balance</p>
                                    <p className={`text-xl font-bold ${customerBalance > 0 ? 'text-slate-900 dark:text-white' : 'text-emerald-600'}`}>
                                        €{customerBalance.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                                    </p>
                                </div>
                            </div>

                            {/* Invoices Table */}
                            {customer.invoices && customer.invoices.length > 0 && (
                                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                                            <tr>
                                                <th className="px-4 py-2">Invoice #</th>
                                                <th className="px-4 py-2">Date</th>
                                                <th className="px-4 py-2">Due Date</th>
                                                <th className="px-4 py-2 text-right">Amount</th>
                                                <th className="px-4 py-2 text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                            {customer.invoices.map((inv: any) => (
                                                <tr key={inv.id} className="hover:bg-slate-100/50 transition-colors">
                                                    <td className="px-4 py-2 font-medium text-slate-700 dark:text-slate-300">{inv.invoiceNumber}</td>
                                                    <td className="px-4 py-2 text-slate-500">{new Date(inv.issueDate).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{new Date(inv.dueDate).toLocaleDateString()}</td>
                                                    <td className="px-4 py-2 text-right text-slate-900 dark:text-white font-medium">
                                                        €{inv.openAmount.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="px-4 py-2 text-right">
                                                        {(inv.daysOverdue > 0 || new Date(inv.dueDate) < new Date()) && inv.openAmount > 0 ? (
                                                            <span className="text-red-600 font-bold text-xs bg-red-100 px-2 py-1 rounded">
                                                                Overdue
                                                            </span>
                                                        ) : (
                                                            <span className="text-emerald-600 font-medium text-xs bg-emerald-100 px-2 py-1 rounded">
                                                                On Time
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Action Footer */}
                            {customer.risk === 'HIGH' && (
                                <div className="mt-4 flex gap-2 justify-end">
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">block</span>
                                        Block Account
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-lg shadow-sm flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                        Send Demand Letter
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
                {filteredData.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        No customers found with the current filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionsDashboard;
