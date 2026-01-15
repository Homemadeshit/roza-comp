import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';
import InvoiceDetailModal from '../components/InvoiceDetailModal';

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedInvoice, setSelectedInvoice] = React.useState<string | null>(null);
    const [isEditingCredit, setIsEditingCredit] = React.useState(false);

    // Find customer. Note: In a real app, this would come from an API.
    // We use a mutable reference here for the demo to show immediate updates.
    const customer = MOCK_COLLECTIONS_DATA.find(c => c.id === id);
    const [currentCreditLimit, setCurrentCreditLimit] = React.useState(customer?.creditLimit || 0);

    const handleSaveCreditLimit = (newLimit: number) => {
        if (customer) {
            customer.creditLimit = newLimit; // Update mock ref
            setCurrentCreditLimit(newLimit);
            setIsEditingCredit(false);
        }
    };

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-xl font-bold text-gray-800">Customer not found</h2>
                <button
                    onClick={() => navigate('/collections')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    // Calculate some derived stats
    const totalOverdue = (customer.invoices as any[]).reduce((acc, inv) => acc + (inv.daysOverdue > 0 ? inv.openAmount : 0), 0);
    const oldestInvoiceDate = customer.invoices.sort((a, b) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime())[0]?.issueDate;

    // Mock "Reminder Block" (since we don't have it in the main mock user object yet, defaulting to false)
    const isReminderBlocked = false;

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">

            {/* Top Navigation */}
            <button
                onClick={() => navigate('/collections')}
                className="flex items-center text-slate-500 hover:text-slate-700 transition-colors"
            >
                <span className="material-symbols-outlined mr-1">arrow_back</span>
                Back to Dashboard
            </button>

            {/* Header Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{customer.companyName}</h1>
                        {isReminderBlocked && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold flex items-center border border-red-200">
                                <span className="material-symbols-outlined text-sm mr-1">block</span>
                                DO NOT CONTACT
                            </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${customer.risk === 'HIGH'
                            ? 'bg-red-50 text-red-700 border-red-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            }`}>
                            {customer.risk} RISK
                        </span>
                    </div>
                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">mail</span> {customer.email}
                        <span className="text-slate-300">|</span>
                        <span className="material-symbols-outlined text-sm">tag</span> ID: {customer.accountViewId}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center">
                        <span className="material-symbols-outlined text-sm mr-2">edit_note</span>
                        Add Note
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center shadow-sm">
                        <span className="material-symbols-outlined text-sm mr-2">send</span>
                        Send Reminder
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Balance</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">€{customer.currentBalance.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overdue Amount</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">€{totalOverdue.toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Credit Limit</p>
                        <button
                            onClick={() => setIsEditingCredit(!isEditingCredit)}
                            className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors uppercase tracking-wide border border-blue-100"
                        >
                            <span className="material-symbols-outlined text-[14px]">edit</span>
                            Edit
                        </button>
                    </div>

                    {isEditingCredit ? (
                        <div className="mt-1 flex items-center gap-2">
                            <input
                                type="number"
                                autoFocus
                                className="w-full border rounded px-2 py-1 text-lg font-bold"
                                defaultValue={currentCreditLimit}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveCreditLimit(Number(e.currentTarget.value));
                                }}
                                onBlur={(e) => handleSaveCreditLimit(Number(e.target.value))}
                            />
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">€{currentCreditLimit.toLocaleString()}</p>
                    )}

                    <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full ${customer.currentBalance > currentCreditLimit ? 'bg-red-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min((customer.currentBalance / currentCreditLimit) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Since</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{oldestInvoiceDate || 'N/A'}</p>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Invoices & Activity</h3>
                    <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{customer.invoices.length} Items</span>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-3">Invoice #</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-right">Open</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {customer.invoices.map(inv => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">#{inv.invoiceNumber}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{inv.issueDate}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{inv.dueDate}</td>
                                <td className="px-6 py-4">
                                    {inv.daysOverdue > 0 ? (
                                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded border border-red-200">
                                            Overdue ({inv.daysOverdue}d)
                                        </span>
                                    ) : (
                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded border border-emerald-200">
                                            {inv.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-sm">€{inv.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right font-mono text-sm font-bold text-slate-900">€{inv.openAmount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setSelectedInvoice(inv.invoiceNumber)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Lines
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Invoice Detail Modal */}
            <InvoiceDetailModal
                isOpen={!!selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
                invoiceNumber={selectedInvoice || ''}
            />

        </div>
    );
};

export default CustomerDetail;
