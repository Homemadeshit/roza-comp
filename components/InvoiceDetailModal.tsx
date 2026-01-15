import React from 'react';

// Using the data provided in step 856 (Invoice #24055)
const MOCK_INVOICE_LINES = [
    { id: 1, description: 'K1 Product laag', amount: 741.00, vat: 66.69 },
    { id: 2, description: 'K1 Product laag', amount: 66.69, vat: 0.00 },
    { id: 3, description: 'K1 Overige kosten', amount: 11.12, vat: 2.33 },
    { id: 4, description: 'K1 Commissie', amount: 29.64, vat: 6.22 },
    { id: 5, description: 'K1 Fust Retour (eenmalig)', amount: -5.85, vat: -0.53 },
];

interface InvoiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    invoiceNumber: string;
}

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ isOpen, onClose, invoiceNumber }) => {
    if (!isOpen) return null;

    // Calculate totals
    const subtotal = MOCK_INVOICE_LINES.reduce((sum, line) => sum + line.amount, 0);
    const totalVat = MOCK_INVOICE_LINES.reduce((sum, line) => sum + line.vat, 0);
    const total = subtotal + totalVat;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 dark:border-slate-800">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invoice #{invoiceNumber}</h3>
                        <p className="text-sm text-slate-500">2026-01-02 • Fresh Flowers Volendam</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Table */}
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">VAT</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {MOCK_INVOICE_LINES.map((line) => (
                                <tr key={line.id}>
                                    <td className="px-6 py-3 text-sm text-slate-700 dark:text-slate-300">{line.description}</td>
                                    <td className="px-6 py-3 text-sm text-slate-500 text-right">€{line.vat.toFixed(2)}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-slate-900 dark:text-white text-right">€{line.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
                            <tr>
                                <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-right">Total</td>
                                <td className="px-6 py-3 font-semibold text-slate-900 dark:text-white text-right">€{totalVat.toFixed(2)}</td>
                                <td className="px-6 py-3 font-bold text-slate-900 dark:text-white text-right">€{total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">download</span> Download PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-slate-300 rounded text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailModal;
