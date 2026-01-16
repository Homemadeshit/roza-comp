import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COLLECTIONS_DATA } from '../utils/mockCollectionsData';
import InvoiceDetailModal from '../components/InvoiceDetailModal';
import NoteModal from '../components/NoteModal';

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = React.useState<any | null>(null);
    const [loading, setLoading] = React.useState(true);

    // Invoices State
    const [selectedInvoice, setSelectedInvoice] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchCustomer = async () => {
            try {
                // Assuming we have an API endpoint to fetch single customer
                // If not, we might need to add it or filter from list (less ideal)
                const response = await fetch(`/api/customers/${id}`);
                const data = await response.json();

                // Transform data if needed or use as is
                setCustomer(data);
            } catch (error) {
                console.error("Failed to load customer", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCustomer();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading Profile...</div>;

    if (!customer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-xl font-bold text-gray-800">Customer not found</h2>
                <button
                    onClick={() => navigate('/customers')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Directory
                </button>
            </div>
        );
    }

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
        <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500">

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
                    <button
                        // onClick={() => setIsNoteModalOpen(true)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <span className="material-symbols-outlined text-sm mr-2">edit_note</span>
                        Add Note
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center shadow-sm">
                        <span className="material-symbols-outlined text-sm mr-2">send</span>
                        Send Reminder
                    </button>
                </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                        <span className="text-slate-500">Email</span>
                        <span className="font-medium text-slate-900 dark:text-white">{customer.email || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                        <span className="text-slate-500">Phone/WA</span>
                        <span className="font-medium text-slate-900 dark:text-white">{customer.whatsappPhone || '-'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-1">
                        <span className="text-slate-500">Website</span>
                        <a href={customer.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">{customer.website || '-'}</a>
                    </div>
                </div>
            </div>

            {/* Address Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Address</h3>
                <div className="space-y-1 text-sm text-slate-900 dark:text-white">
                    <p>{customer.street} {customer.houseNumber}</p>
                    <p>{customer.zipCode} {customer.city}</p>
                    <p className="font-semibold">{customer.country}</p>
                </div>
            </div>

            {/* Financial Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-1 md:col-span-2">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Financial Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-slate-500 text-xs">IBAN</p>
                        <p className="font-mono font-medium">{customer.iban || 'Not set'}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">VAT Number</p>
                        <p className="font-medium">{customer.vatNumber || '-'}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">CoC Number</p>
                        <p className="font-medium">{customer.cocNumber || '-'}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">Credit Limit</p>
                        <p className="font-medium text-emerald-600">€{customer.creditLimit?.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Invoices List */}

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

        </div >
    );
}

export default CustomerDetail;

