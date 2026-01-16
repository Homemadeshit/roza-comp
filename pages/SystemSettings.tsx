import React, { useState } from 'react';
import { api } from '../utils/api'; // Use centralized API

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'automation' | 'templates' | 'integrations'>('general');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [showToast, setShowToast] = useState(false);

  // Settings State (Mock Persistence)
  const [defaultCreditLimit, setDefaultCreditLimit] = useState(() => {
    return localStorage.getItem('defaultCreditLimit') || '5000.00';
  });

  const handleSaveConfiguration = () => {
    localStorage.setItem('defaultCreditLimit', defaultCreditLimit);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncStatus('idle');
    try {
      // Call the centralized API client
      await api.post('/sync');
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      console.error("Sync failed", error);
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-20 relative">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">System Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal max-w-xl">
            Manage your automated AR workflows, integration status, and communication rules.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveConfiguration}
            className="flex items-center justify-center px-6 h-9 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors shadow-sm focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-1 dark:focus:ring-offset-slate-900"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {[
          { id: 'general', label: 'General Defaults', icon: 'tune' },
          { id: 'automation', label: 'Automation Rules', icon: 'auto_fix_high' },
          { id: 'templates', label: 'Message Templates', icon: 'mail' },
          { id: 'integrations', label: 'Integrations', icon: 'hub' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${activeTab === tab.id ? 'filled' : ''}`}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">

        {/* Automation Rules Tab */}
        {activeTab === 'automation' && (
          <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Blocking Logic</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure when the system should automatically flag a customer as blocked.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative inline-flex items-center">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Block on Credit Limit Exceeded</span>
                  </label>
                  <span className="material-symbols-outlined text-slate-400">credit_score</span>
                </div>
                <div className="space-y-3 pl-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Tolerance Buffer (%)</label>
                    <div className="relative">
                      <input type="number" defaultValue="5" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Allow customers to exceed limit by 5% before blocking.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 p-5 rounded-lg border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative inline-flex items-center">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Block on Overdue Invoices</span>
                  </label>
                  <span className="material-symbols-outlined text-slate-400">calendar_clock</span>
                </div>
                <div className="space-y-3 pl-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Grace Period (Days)</label>
                    <input type="number" defaultValue="7" className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Block customer 7 days after invoice due date.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Payment Plan Monitoring</h3>
              <label className="flex items-start gap-3 p-4 rounded-lg border border-blue-100 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-500/20 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-blue-600 focus:ring-offset-0 focus:ring-2 focus:ring-blue-500/20" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Auto-Unblock on Plan Activation</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Automatically remove internal finance block when a new payment plan is approved and active.</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Weekly Statement Templates</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Customize the automated messages sent via Email and WhatsApp.</p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email Template */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">mail</span> Email Body
                  </label>
                  <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Supports Markdown</span>
                </div>
                <textarea
                  className="w-full h-40 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-sm font-mono text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  defaultValue={`Dear {{customer_name}},

Please find attached your weekly statement of outstanding invoices.

Total Outstanding: {{total_amount}}
Overdue Amount: {{overdue_amount}}

Please ensure payment for overdue items is made by {{next_friday}}.

Kind regards,
Finance Team - PP Flowers`}
                />
              </div>

              {/* WhatsApp Template */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp Message
                  </label>
                  <span className="text-xs text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-2 py-1 rounded border border-green-100 dark:border-green-500/20">WhatsApp API Active</span>
                </div>
                <textarea
                  className="w-full h-32 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-sm font-mono text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  defaultValue={`Hi {{contact_first_name}}, just a reminder from PP Flowers.
Your current balance is {{total_amount}}. 
Please check your email for the detailed statement. 
Payment Link: {{payment_link}}`}
                />
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold">Available Variables:</span> {'{{customer_name}}, {{total_amount}}, {{overdue_amount}}, {{invoice_list}}, {{payment_link}}'}
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">System Integrations</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage connections to external financial systems.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* AccountView */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-lg">AV</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">AccountView</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Financial Data Source • Syncs every 15 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Connected
                  </div>
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${isSyncing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent cursor-wait'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {isSyncing ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin"></span>
                        Syncing...
                      </>
                    ) : syncStatus === 'success' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check</span> Done
                      </span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">sync</span> Sync Now
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">chat</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">WhatsApp Business</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Automated messaging channel • Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Connected
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Configure
                  </button>
                </div>
              </div>

              {/* Email / Outlook */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#0078D4] text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[26px]">mail</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Office 365 Mail</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">SMTP Integration • finance@ppflowers.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Connected
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Tab (Previous Content) */}
        {activeTab === 'general' && (
          <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Financial Defaults</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Set the baseline parameters for new customer accounts.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal" htmlFor="credit-limit">Default Credit Limit</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 dark:text-slate-500 text-sm">$</span>
                  </div>
                  <input
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm h-10 pl-7 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    id="credit-limit"
                    placeholder="0.00"
                    type="number"
                    value={defaultCreditLimit}
                    onChange={(e) => setDefaultCreditLimit(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal" htmlFor="payment-term">Default Payment Term</label>
                <div className="relative">
                  <select className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm h-10 pl-3 pr-10 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer" id="payment-term" defaultValue="net30">
                    <option value="net15">Net 15</option>
                    <option value="net30">Net 30</option>
                    <option value="net45">Net 45</option>
                    <option value="net60">Net 60</option>
                    <option value="due_receipt">Due on Receipt</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="mt-6 flex gap-2 text-slate-500 dark:text-slate-400 text-sm px-1 items-start">
        <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">info</span>
        <p>Changes made here affect the global system configuration immediately upon saving. Customer-specific overrides will take precedence over these defaults.</p>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <span className="material-symbols-outlined text-green-400 dark:text-green-600">check_circle</span>
          <span className="font-medium text-sm">Configuration saved successfully!</span>
        </div>
      )}
    </div>
  );
};

export default SystemSettings;
