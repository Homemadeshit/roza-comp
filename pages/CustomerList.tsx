import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api'; // Use centralized API

interface Customer {
    id: string;
    companyName: string;
    accountViewId: string;
    email: string;
    creditLimit: number;
    currentBalance: number;
    maxPaymentDays: number;
    isBlockedLocally: boolean;
    // Computed/Derived properties for display
    status: 'Overdue' | 'At Risk' | 'Disputed' | 'Current';
    initials: string;
}

const StatusBadge = ({ status }: { status: Customer['status'] }) => {
    const colors = {
        'Overdue': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
        'At Risk': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
        'Disputed': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
        'Current': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    };

    const dots = {
        'Overdue': 'bg-red-500',
        'At Risk': 'bg-amber-500',
        'Disputed': 'bg-blue-500',
        'Current': 'bg-emerald-500',
    };

    return (
        <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium ${colors[status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`}></span>
            {status}
        </span>
    );
};

const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Use the centralized API client
                const response = await api.get('/customers');
                
                // Transform backend entity to frontend display model
                const mappedData: Customer[] = response.data.map((c: any) => {
                    // Logic to determine display status
                    let status: Customer['status'] = 'Current';
                    if (c.currentBalance > c.creditLimit) status = 'Overdue';
                    else if (c.isBlockedLocally) status = 'Disputed';
                    else if (c.currentBalance > (c.creditLimit * 0.9)) status = 'At Risk';

                    return {
                        id: c.id,
                        companyName: c.companyName,
                        accountViewId: c.accountViewId || 'N/A',
                        email: c.email,
                        creditLimit: c.creditLimit,
                        currentBalance: c.currentBalance,
                        status: status,
                        initials: c.companyName.substring(0, 2).toUpperCase()
                    };
                });

                setCustomers(mappedData);
            } catch (error) {
                console.error("Failed to fetch customers", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    // Filter logic
    const filteredCustomers = customers.filter(c => 
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.accountViewId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1200px] mx-auto pb-10">
            {/* Breadcrumb & Header */}
            <nav className="flex flex-wrap gap-2 mb-6 text-sm font-medium">
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">Home</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">Accounts Receivable</span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-900 dark:text-slate-100">Customer List</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customer Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl">Monitor account statuses, outstanding balances, and identify exceptions requiring attention.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 h-9 px-4 text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <span className="material-symbols-outlined text-[18px]">download</span> Export
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white h-9 px-4 text-sm font-medium shadow-sm hover:bg-blue-500 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">add</span> Add Customer
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
                <div className="w-full lg:max-w-md relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 text-[20px] group-focus-within:text-blue-500 transition-colors">search</span>
                    </div>
                    <input 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm h-10 shadow-sm transition-all" 
                        placeholder="Search by name, ID, or invoice..." 
                        type="text" 
                    />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide mr-1">Status:</span>
                    <button className="inline-flex h-8 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-100 px-3 transition-colors">
                        <span className="text-white dark:text-slate-900 text-xs font-medium">All</span>
                    </button>
                    {['Overdue', 'At Risk', 'Disputed'].map(status => (
                         <button key={status} className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 px-3 transition-colors">
                            <span className={`h-1.5 w-1.5 rounded-full ${status === 'Overdue' ? 'bg-red-500' : status === 'At Risk' ? 'bg-amber-500' : 'bg-blue-500'}`}></span>
                            <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">{status}</span>
                         </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800">
                                <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">Customer Name</th>
                                <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Outstanding Balance</th>
                                <th className="py-4 px-6 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Credit Limit</th>
                                <th className="py-4 px-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></span>
                                            Loading customers...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-slate-500">No customers found. Try syncing in Settings.</td>
                                </tr>
                            ) : filteredCustomers.map((customer) => (
                                <tr 
                                    key={customer.id} 
                                    onClick={() => navigate(`/customers/${customer.id}`)}
                                    className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${customer.status === 'Overdue' ? 'bg-red-50/30 dark:bg-red-900/20' : ''}`}
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-400 ring-1 ring-inset ring-indigo-100 dark:ring-indigo-500/20">
                                                {customer.initials}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-white text-sm">{customer.companyName}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">ID: {customer.accountViewId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <StatusBadge status={customer.status} />
                                    </td>
                                    <td className="py-4 px-6 text-right font-mono text-sm text-slate-900 dark:text-white font-medium">
                                        € {customer.currentBalance.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="py-4 px-6 text-right text-sm">
                                        <span className="text-slate-600 dark:text-slate-300 block">€ {customer.creditLimit.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}</span>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {/* Pagination */}
                 <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Showing <span className="font-medium text-slate-700 dark:text-slate-200">{filteredCustomers.length}</span> results</p>
                    <div className="flex items-center gap-2">
                        <button disabled className="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 cursor-not-allowed">Previous</button>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
