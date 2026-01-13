import React from 'react';
import { Link } from 'react-router-dom';

const DisputeDetail = () => {
  return (
    <div className="flex gap-0 relative min-h-full">
        {/* Left Sidebar - Open Disputes */}
        <aside className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shrink-0 overflow-y-auto hidden xl:flex h-[calc(100vh-80px)] sticky top-0">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Open Disputes (12)</h3>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
            </div>
            <div className="flex flex-col">
                <div className="p-4 bg-blue-50 dark:bg-slate-800/50 border-l-4 border-blue-500 cursor-pointer transition-colors group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Acme Corp</span>
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-400/10 px-2 py-0.5 rounded">Action Required</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs mb-2">#INV-2024-001 • Oct 24</div>
                    <div className="flex justify-between items-end">
                        <span className="text-slate-900 dark:text-white font-semibold text-sm">$2,000.00</span>
                        <span className="text-slate-400 text-xs">14d ago</span>
                    </div>
                </div>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-white">Globex Inc.</span>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Under Review</span>
                    </div>
                    <div className="text-slate-400 text-xs mb-2">#INV-2024-042 • Nov 02</div>
                    <div className="flex justify-between items-end">
                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-white">$450.00</span>
                        <span className="text-slate-400 text-xs">2d ago</span>
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 lg:px-12 pb-48 lg:pb-32">
             <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white cursor-pointer text-sm font-medium mb-6 transition-colors w-fit">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <Link to="/">Back to Queue</Link>
            </div>

            <div className="flex flex-wrap justify-between gap-6 mb-8 items-start border-b border-slate-200 dark:border-slate-800 pb-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">Dispute #8823</h1>
                        <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-500/20 uppercase tracking-wide">Action Required</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-500 dark:text-slate-400 text-sm mt-1">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">domain</span>
                            <span className="text-slate-700 dark:text-white font-medium">Acme Corp</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                            <span>#INV-2024-001</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                        <span>Oct 24, 2023</span>
                    </div>
                </div>
                 <div className="flex gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center h-9 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-white text-sm font-medium transition-colors">
                        <span className="material-symbols-outlined mr-2 text-[18px]">description</span> View Invoice
                    </button>
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Invoice</p>
                        <p className="text-slate-900 dark:text-white text-2xl font-bold tabular-nums">$12,450.00</p>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500/40 w-full rounded-full"></div>
                    </div>
                </div>
                 <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="absolute right-[-10px] top-[-10px] p-5 opacity-5 pointer-events-none">
                        <span className="material-symbols-outlined text-8xl text-slate-900 dark:text-white">gavel</span>
                    </div>
                     <div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Disputed Amount</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tabular-nums">$2,000.00</p>
                            <span className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-400/10 px-1.5 py-0.5 rounded">16%</span>
                        </div>
                    </div>
                     <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-[16%] rounded-full"></div>
                    </div>
                 </div>
                 <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                     <div>
                        <div className="flex justify-between items-start">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Aging</p>
                        </div>
                         <div className="flex items-baseline gap-2">
                            <p className="text-slate-900 dark:text-white text-2xl font-bold tabular-nums">14 Days</p>
                        </div>
                     </div>
                      <div className="flex items-center gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-[14px]">event</span> Due: Nov 24, 2023
                        </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Chat / Thread */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                         <div className="px-4 md:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">JD</div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none">John Doe</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Acme Corp • 10:42 AM</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs font-medium rounded border border-slate-200 dark:border-slate-800">Email</span>
                            </div>
                         </div>
                         <div className="p-4 md:p-6">
                            <div className="prose prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                                <p className="mb-4">Hello AR Team,</p>
                                <p className="mb-4">We are disputing a portion of invoice <strong>#INV-2024-001</strong>. We received 8 units damaged in shipment #442. The packaging was crushed upon arrival, and the contents are unusable.</p>
                                <div className="pl-4 mb-4 border-l-2 border-slate-300 dark:border-slate-600 italic text-slate-500 dark:text-slate-400 py-1">
                                    "We are withholding payment for those units ($2,000.00 total) until this is resolved. The remainder of the invoice has been scheduled for payment."
                                </div>
                                <p>Please advise on the return process or credit issuance.</p>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <a className="group flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-blue-500/50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800" href="#">
                                    <div className="bg-white dark:bg-slate-900 p-1.5 rounded text-slate-400 group-hover:text-blue-500 border border-slate-200 dark:border-slate-800">
                                        <span className="material-symbols-outlined text-[20px]">image</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700 dark:text-white group-hover:text-blue-500">damaged_box.jpg</span>
                                        <span className="text-[10px] text-slate-400">2.4 MB</span>
                                    </div>
                                </a>
                            </div>
                         </div>
                         <div className="px-4 md:px-6 py-4 bg-slate-50 dark:bg-slate-950/30 border-t border-slate-200 dark:border-slate-800">
                            <button className="w-full text-left bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-slate-400 text-sm hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all flex justify-between items-center group shadow-sm">
                                <span>Click to reply...</span>
                                <span className="material-symbols-outlined text-[18px] opacity-50 group-hover:opacity-100 transform group-hover:translate-x-1 transition-transform">send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Info Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col h-full max-h-[500px] overflow-hidden shadow-sm">
                        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-[18px]">list_alt</span> Disputed Items
                            </h3>
                            <span className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded font-medium border border-red-100 dark:border-red-500/20">8 items</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
                             <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors flex gap-3 group cursor-default border border-transparent">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-950 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Industrial Widget X2</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">$250.00</p>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">SKU: WID-X2-99</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-100 dark:border-red-500/20 font-medium">Disputed: 8</span>
                                        <span className="text-[10px] text-slate-400">Total Qty: 50</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30">
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Total Value</span>
                                <span className="font-bold text-slate-900 dark:text-white tabular-nums">$2,000.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                         <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white text-sm font-bold">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">sticky_note_2</span> Internal Notes
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            Customer has a history of shipping claims in Q4. Approved for standard credit process.
                        </p>
                         <div className="mt-4 flex gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Added by @Sarah (Manager)
                            </span>
                        </div>
                    </div>
                </div>
             </div>

             {/* Bottom Action Bar */}
             <div className="fixed bottom-[60px] lg:bottom-0 right-0 left-0 lg:left-64 bg-[#E8E8E8]/90 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 z-40 shadow-xl">
                 <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono text-slate-500 dark:text-slate-400">
                            <span className="text-[10px]">⌘</span>
                            <span>ENTER</span>
                        </div>
                        <span>to resolve dispute</span>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button className="flex-1 sm:flex-none h-10 px-4 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors">
                            Leave Open
                        </button>
                        <button className="flex-1 sm:flex-none h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                             <span className="material-symbols-outlined text-[18px]">edit_note</span> Adjust
                        </button>
                         <button className="flex-1 sm:flex-none h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95">
                             <span className="material-symbols-outlined text-[18px]">check_circle</span> Resolve
                        </button>
                    </div>
                 </div>
             </div>
        </div>
    </div>
  );
};

export default DisputeDetail;