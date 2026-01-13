import React from 'react';

interface PaymentPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentPlanModal: React.FC<PaymentPlanModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Create Payment Plan</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal mt-0.5">Set terms for Customer #4928 (Acme Corp)</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wide">Amount per period</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">$</span>
                                <input type="text" className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 pl-7 pr-3 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="0.00" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wide">Frequency</label>
                                <select className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                                    <option>Monthly</option>
                                    <option>Bi-Weekly</option>
                                    <option>Weekly</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wide">Start Date</label>
                                <input type="date" defaultValue="2023-10-24" className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-3 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-start gap-3 border border-blue-100 dark:border-blue-500/20">
                         <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg mt-0.5">info</span>
                         <div>
                            <p className="text-slate-900 dark:text-white text-sm font-semibold">Projected Recovery: 6 months</p>
                            <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                                Based on these terms, the final payment is estimated for <span className="font-medium text-slate-900 dark:text-white">April 24, 2024</span>.
                            </p>
                         </div>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer group">
                             <input type="checkbox" className="mt-0.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-blue-600 focus:ring-offset-0 focus:ring-2 focus:ring-blue-500/20" />
                             <div>
                                <span className="block text-slate-900 dark:text-slate-200 text-sm font-medium group-hover:text-blue-500 transition-colors">Allow ordering during plan</span>
                                <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">Risk: High. Only recommended for strategic accounts.</span>
                             </div>
                        </label>
                         <label className="flex items-start gap-3 cursor-pointer group">
                             <input type="checkbox" defaultChecked className="mt-0.5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-blue-600 focus:ring-offset-0 focus:ring-2 focus:ring-blue-500/20" />
                             <div>
                                <span className="block text-slate-900 dark:text-slate-200 text-sm font-medium group-hover:text-blue-500 transition-colors">Pause credit rules for disputed invoices</span>
                                <span className="block text-slate-500 dark:text-slate-400 text-xs mt-0.5">Prevents automated dunning while payments are current.</span>
                             </div>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">Cancel</button>
                    <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-sm shadow-blue-500/20 transition-all">Activate Plan</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPlanModal;