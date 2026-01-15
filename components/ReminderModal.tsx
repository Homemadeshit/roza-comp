import React, { useState, useEffect } from 'react';

interface Customer {
    id: string;
    companyName: string;
    email: string;
    [key: string]: any;
}
import { MOCK_EMAIL_TEMPLATES } from '../utils/mockCollectionsData';

interface ReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: Customer | null;
}

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, customer }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [previewContent, setPreviewContent] = useState<string>('');

    // Load initial template
    useEffect(() => {
        if (isOpen && MOCK_EMAIL_TEMPLATES.length > 0) {
            // Default to the first usage of 'REMINDER' or just the first one
            const defaultTemplate = MOCK_EMAIL_TEMPLATES.find(t => t.type === 'REMINDER') || MOCK_EMAIL_TEMPLATES[0];
            setSelectedTemplateId(defaultTemplate.id);
        }
    }, [isOpen]);

    // Update preview when template or selected ID changes
    useEffect(() => {
        const template = MOCK_EMAIL_TEMPLATES.find(t => t.id === selectedTemplateId);
        if (template) {
            // Decode Base64
            try {
                const decoded = atob(template.contentBase64);
                // Simple variable substitution (can be expanded later)
                // Note: The provided HTML might be full documents, so we'll just inject it.
                // In a real app, we'd replace placeholders like {{customerName}} here.
                setPreviewContent(decoded);
            } catch (e) {
                console.error("Failed to decode template", e);
                setPreviewContent("Error loading preview.");
            }
        }
    }, [selectedTemplateId]);

    if (!isOpen || !customer) return null;

    const handleSend = () => {
        // In a real app, this would make an API call to the backend
        alert(`Reminder sent to ${customer.email} using template: ${selectedTemplateId}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Send Reminder</h3>
                        <p className="text-sm text-gray-500">To: {customer.companyName} ({customer.email})</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 text-2xl font-bold leading-none"
                    >
                        &times;
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar / Controls */}
                    <div className="w-1/3 p-6 border-r border-gray-200 overflow-y-auto bg-white">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
                            <select
                                value={selectedTemplateId}
                                onChange={(e) => setSelectedTemplateId(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                {MOCK_EMAIL_TEMPLATES.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                            <div className="p-2 bg-gray-100 rounded text-sm text-gray-800 border border-gray-200">
                                {MOCK_EMAIL_TEMPLATES.find(t => t.id === selectedTemplateId)?.subject || 'No Subject'}
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                            <h4 className="text-sm font-medium text-yellow-800 mb-2">Notice</h4>
                            <p className="text-xs text-yellow-700">
                                This will send an email to the registered address. Please verify the preview before sending.
                            </p>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="w-2/3 bg-gray-100 flex flex-col p-6">
                        <div className="bg-white shadow rounded-lg flex-1 overflow-hidden relative">
                            {/* This simulates an email client view */}
                            <div className="absolute inset-0 overflow-auto">
                                <iframe
                                    title="Email Preview"
                                    srcDoc={previewContent}
                                    className="w-full h-full border-0"
                                    sandbox="allow-same-origin" // Security: restrict scripts
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderModal;
