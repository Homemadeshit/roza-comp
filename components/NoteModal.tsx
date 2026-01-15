import React, { useState, useEffect } from 'react';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    customerName: string;
    initialNote: string;
    onSave: (note: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, customerName, initialNote, onSave }) => {
    const [note, setNote] = useState(initialNote);

    useEffect(() => {
        setNote(initialNote);
    }, [initialNote, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Internal Note</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">For {customerName}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Customer Comments / Notes
                    </label>
                    <textarea
                        className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none placeholder-slate-400"
                        placeholder="Add internal details about payment promises, disputes, or contact preferences..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoFocus
                    />
                    <div className="mt-2 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[14px] mt-0.5">lock</span>
                        <p>These notes are internal only and will NOT be visible to the customer.</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(note)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[18px]">save</span>
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
