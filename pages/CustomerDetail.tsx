import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../utils/api'; // Use centralized API
import PaymentPlanModal from '../components/PaymentPlanModal';
import Loader from '../components/Loader';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  paidAmount: number;
  issueDate: string;
  dueDate: string;
  status: 'OPEN' | 'PAID' | 'OVERDUE';
}

interface CustomerDetailData {
  id: string;
  companyName: string;
  accountViewId: string;
  email: string;
  creditLimit: number;
  currentBalance: number;
  maxPaymentDays: number;
  isBlockedLocally: boolean;
  invoices: Invoice[];
}

const CustomerDetail = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState<CustomerDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

    useEffect(() => {
        const fetchCustomerDetail = async () => {
            try {
                // Use the centralized API client
                const response = await api.get(`/customers/${id}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("Failed to fetch customer details", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCustomerDetail();
    }, [id]);

    if (loading) return <div className="p-10 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>;
    if (!customer) return <div className="p-10 text-center">Customer not found</div>;

    // Derived State
    const utilization = customer.creditLimit > 0 ? (customer.currentBalance / customer.creditLimit) * 100 : 0;
    const isOverLimit = customer.currentBalance > customer.creditLimit;
    const hasActivePlan = false; // Placeholder until PaymentPlans are fully synced

    return (
        <div className="max-w-[1100px] mx-auto pb-24">
            <PaymentPlanModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
                <Link to="/customers" className="hover:text-blue-500 transition-colors">Accounts</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>Details</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-slate-900 dark:text-white">{customer.companyName}</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{customer.companyName}</h1>
                        {isOverLimit || customer.isBlockedLocally ? (
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30 uppercase tracking-wide">
                                Blocked
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 uppercase tracking-wide">
                                Active
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">ID: {customer.accountViewId}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">mail</span>
                            <a href={`mailto:${customer.email}`} className="text-blue-500 hover:underline ml-1">{customer.email || 'No Email'}</a>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">edit</span> Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">history</span> History
                    </button>
                </div>
            </div>

            {/* Alert Banner (Conditional) */}
            {(isOverLimit || customer.isBlockedLocally) && (
                <div className="bg-white dark:bg-slate-900 border-l-4 border-red-500 rounded-lg shadow-sm p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                        <span className="material-symbols-outlined text-[180px] text-red-600">gpp_bad</span>
                    </div>
                    <div className="shrink-0">
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined text-2xl">warning</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 z-10 max-w-3xl">
                        <p className="text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                            System Alert
                        </p>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            Credit Limit Exceeded
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Current balance of <strong>€{customer.currentBalance.toFixed(2)}</strong> exceeds the limit of <strong>€{customer.creditLimit.toFixed(2)}</strong>. Please create a payment plan or request immediate payment.
                        </p>
                    </div>
                </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                 <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Outstanding</p>
                        <span className="material-symbols-outlined text-slate-300 text-[20px]">account_balance</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">€ {customer.currentBalance.toLocaleString()}</p>
                    </div>
                 </div>

                 <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Credit Limit</p>
                        <span className="material-symbols-outlined text-slate-300 text-[20px]">credit_score</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">€ {customer.creditLimit.toLocaleString()}</p>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-2 overflow-hidden">
                             <div 
                                className={`h-full rounded-full w-full ${utilization > 100 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                style={{ width: `${Math.min(utilization, 100)}%` }}
                             ></div>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 text-right">{utilization.toFixed(1)}% utilized</p>
                    </div>
                 </div>

                 <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Terms</p>
                        <span className="material-symbols-outlined text-slate-300 text-[20px]">contract</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Net {customer.maxPaymentDays}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Standard Agreement</p>
                    </div>
                 </div>

                 <div className="p-5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Open Invoices</p>
                        <span className="material-symbols-outlined text-slate-300 text-[20px]">receipt_long</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{customer.invoices.filter(i => i.status !== 'PAID').length}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Items pending payment</p>
                    </div>
                 </div>
            </div>

            {/* Invoices Table & Actions */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Recent Invoices
                        </h3>
                     </div>
                     <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-3.5">Invoice #</th>
                                    <th className="px-6 py-3.5">Due Date</th>
                                    <th className="px-6 py-3.5 text-right">Amount</th>
                                    <th className="px-6 py-3.5 text-right">Paid</th>
                                    <th className="px-6 py-3.5 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {customer.invoices.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-slate-500">No invoices found.</td>
                                    </tr>
                                ) : (
                                    customer.invoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                                {new Date(inv.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono">€{Number(inv.amount).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-right font-mono text-slate-500">€{Number(inv.paidAmount).toFixed(2)}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                                    inv.status === 'OVERDUE' ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                                                    inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                                                    'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                                                }`}>
                                                    {inv.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                     </div>
                </div>

                {/* Sidebar Actions */}
                <div className="w-full lg:w-80 space-y-8">
                     <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                             <span className="material-symbols-outlined text-[16px]">bolt</span> Required Actions
                        </h3>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => setIsPlanModalOpen(true)} className="group w-full flex items-center justify-between bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md shadow-blue-500/20 transition-all transform active:scale-[0.99]">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">handshake</span>
                                    <span>Create Payment Plan</span>
                                </div>
                                <span className="material-symbols-outlined opacity-70 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                             <button className="group w-full flex items-center justify-between bg-white dark:bg-transparent border border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-500 text-slate-700 dark:text-slate-200 font-semibold py-3 px-4 rounded-lg transition-all transform active:scale-[0.99]">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">lock_open</span>
                                    <span>Temporary Unblock</span>
                                </div>
                            </button>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                             <span className="material-symbols-outlined text-[16px]">history</span> Activity Log
                        </h3>
                        <div className="relative pl-4 border-l border-slate-200 dark:border-slate-800 space-y-8">
                            <div className="relative group">
                                <div className="absolute -left-[21px] top-0 h-8 w-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                     <span className="material-symbols-outlined text-blue-500 text-[16px]">sync</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">Synced from AV</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Financial data updated.</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-1">JUST NOW</p>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
