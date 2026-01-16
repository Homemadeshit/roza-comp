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

    // Editing State
    const [isNoteModalOpen, setIsNoteModalOpen] = React.useState(false);
    const [isEditingLimit, setIsEditingLimit] = React.useState(false);
    const [creditLimitInput, setCreditLimitInput] = React.useState('');

    const handleSaveNote = async (newNote: string) => {
        try {
            const response = await fetch(`/api/customers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notes: newNote }),
            });
            if (response.ok) {
                setCustomer({ ...customer, notes: newNote });
                setIsNoteModalOpen(false);
            } else {
                alert('Failed to save note');
            }
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Error saving note');
        }
    };

    const handleSaveCreditLimit = async () => {
        const newLimit = parseFloat(creditLimitInput);
        if (isNaN(newLimit)) {
            alert('Please enter a valid number');
            return;
        }

        try {
            const response = await fetch(`/api/customers/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ creditLimit: newLimit }),
            });
            if (response.ok) {
                setCustomer({ ...customer, creditLimit: newLimit });
                setIsEditingLimit(false);
            } else {
                alert('Failed to update credit limit');
            }
        } catch (error) {
            console.error('Error updating credit limit:', error);
            alert('Error updating credit limit');
        }
    };

    const handleSendReminder = async () => {
        if (!window.confirm(`Send WhatsApp reminder to ${customer.whatsappPhone}?`)) return;

        try {
            const response = await fetch('/api/reminders/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customer.id,
                    invoiceNumbers: customer.invoices.filter((inv: any) => inv.status === 'OVERDUE').map((inv: any) => inv.invoiceNumber),
                }),
            });

            if (response.ok) {
                alert('Reminder sent successfully!');
            } else {
                const err = await response.json();
                alert(`Failed to send reminder: ${err.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error sending reminder:', error);
            alert('Error sending reminder');
        }
    };

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
                        onClick={() => setIsNoteModalOpen(true)}
                        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center"
                    >
                        <span className="material-symbols-outlined text-sm mr-2">edit_note</span>
                        Edit Notes
                    </button>
                    <button
                        onClick={handleSendReminder}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center shadow-sm"
                    >
                        <span className="material-symbols-outlined text-sm mr-2">send</span>
                        Send Reminder
                    </button>
                    <button
                        onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this customer? This cannot be undone.')) {
                                try {
                                    await fetch(`/api/customers/${id}`, { method: 'DELETE' });
                                    navigate('/customers');
                                } catch (e) {
                                    alert('Failed to delete customer.');
                                }
                            }
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium text-sm flex items-center border border-red-200"
                    >
                        <span className="material-symbols-outlined text-sm mr-2">delete</span>
                        Delete
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
                        <p className="text-slate-500 text-xs mb-1">Credit Limit</p>
                        {isEditingLimit ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="w-24 px-2 py-1 text-sm border rounded"
                                    value={creditLimitInput}
                                    onChange={(e) => setCreditLimitInput(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={handleSaveCreditLimit} className="text-green-600 hover:text-green-800">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                </button>
                                <button onClick={() => setIsEditingLimit(false)} className="text-red-600 hover:text-red-800">
                                    <span className="material-symbols-outlined text-sm">close</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 group">
                                <p className="font-medium text-emerald-600">€{customer.creditLimit?.toLocaleString()}</p>
                                <button
                                    onClick={() => {
                                        setCreditLimitInput(customer.creditLimit?.toString() || '0');
                                        setIsEditingLimit(true);
                                    }}
                                    className="text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-xs">edit</span>
                                </button>
                            </div>
                        )}
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
                        {customer.invoices.map((inv: any) => (
                            <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">#{inv.invoiceNumber}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : '-'}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '-'}</td>
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

            {/* Note Modal */}
            <NoteModal
                isOpen={isNoteModalOpen}
                onClose={() => setIsNoteModalOpen(false)}
                customerName={customer.companyName}
                initialNote={customer.notes || ''}
                onSave={handleSaveNote}
            />

        </div >
    );
}

export default CustomerDetail;
