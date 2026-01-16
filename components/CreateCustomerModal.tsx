import React, { useState } from 'react';
import { api } from '../utils/api';

interface CreateCustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const CreateCustomerModal: React.FC<CreateCustomerModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        whatsappPhone: '',
        website: '',
        street: '',
        houseNumber: '',
        zipCode: '',
        city: '',
        country: 'NL',
        iban: '',
        vatNumber: '',
        cocNumber: '',
        creditLimit: 5000,
        maxPaymentDays: 30
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Use 'api' instance to ensure interceptor (mock or auth) is used
            await api.post('/customers', formData);

            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                    <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white" id="modal-title">
                                    Add New Customer
                                </h3>
                                {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Contact Section */}
                                        <div className="col-span-1 md:col-span-2">
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-200 pb-1">Contact Details</h4>
                                        </div>

                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                value={formData.companyName}
                                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                            <input
                                                type="email"
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">WhatsApp / Phone</label>
                                            <input
                                                type="text"
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                value={formData.whatsappPhone}
                                                onChange={e => setFormData({ ...formData, whatsappPhone: e.target.value })}
                                            />
                                        </div>

                                        {/* Address Section */}
                                        <div className="col-span-1 md:col-span-2 mt-2">
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-200 pb-1">Address</h4>
                                        </div>

                                        <div className="col-span-1 md:col-span-1">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Street</label>
                                            <input type="text" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>
                                        <div className="col-span-1 md:col-span-1">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">House Nr.</label>
                                            <input type="text" value={formData.houseNumber} onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Zip Code</label>
                                            <input type="text" value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                                            <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>

                                        {/* Financial Section */}
                                        <div className="col-span-1 md:col-span-2 mt-2">
                                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-200 pb-1">Financial & Legal</h4>
                                        </div>

                                        <div className="col-span-1 md:col-span-2">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">IBAN</label>
                                            <input type="text" value={formData.iban} onChange={e => setFormData({ ...formData, iban: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">VAT Number</label>
                                            <input type="text" value={formData.vatNumber} onChange={e => setFormData({ ...formData, vatNumber: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">CoC (KvK)</label>
                                            <input type="text" value={formData.cocNumber} onChange={e => setFormData({ ...formData, cocNumber: e.target.value })}
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Credit Limit</label>
                                            <input
                                                type="number"
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                value={formData.creditLimit}
                                                onChange={e => setFormData({ ...formData, creditLimit: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Payment Days</label>
                                            <input
                                                type="number"
                                                className="mt-1 block w-full border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                                value={formData.maxPaymentDays}
                                                onChange={e => setFormData({ ...formData, maxPaymentDays: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                        >
                                            {loading ? 'Creating...' : 'Create Customer'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
