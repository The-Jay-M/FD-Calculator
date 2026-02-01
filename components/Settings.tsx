import React from 'react';

interface SettingsProps {
  onResetData: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onResetData }) => {
  return (
    <div className="flex flex-col h-full min-h-screen bg-background-dark pb-24 animate-in slide-in-from-right duration-300">
      <div className="p-6 pt-12">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-white/40 text-sm">Preferences & Data Management</p>
      </div>

      <div className="px-4 space-y-6">
        {/* Account Section */}
        <section className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Account</h3>
            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                <div className="p-4 flex items-center gap-4 border-b border-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                        EM
                    </div>
                    <div>
                        <p className="text-white font-bold">Elite Member</p>
                        <p className="text-white/40 text-xs">Pro Plan Active</p>
                    </div>
                </div>
            </div>
        </section>

        {/* App Settings */}
        <section className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Application</h3>
            <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                 <div className="p-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/60">dark_mode</span>
                        <span className="text-white font-medium">Dark Mode</span>
                    </div>
                    <div className="w-10 h-5 bg-primary rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                 </div>
                 <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-white/60">notifications</span>
                        <span className="text-white font-medium">Notifications</span>
                    </div>
                     <div className="w-10 h-5 bg-white/20 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white/60 rounded-full"></div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Data Management */}
        <section className="space-y-3">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest ml-1">Danger Zone</h3>
            <div className="bg-red-500/10 rounded-xl border border-red-500/20 overflow-hidden">
                 <button onClick={onResetData} className="w-full p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors">
                    <span className="material-symbols-outlined">delete_forever</span>
                    <div className="text-left">
                        <p className="font-bold">Reset All Data</p>
                        <p className="text-xs opacity-70">Clear all saved investments permanently</p>
                    </div>
                 </button>
            </div>
        </section>

        <div className="text-center pt-8 pb-4">
            <p className="text-white/20 text-xs font-mono">v1.0.0 (Build 2405)</p>
            <p className="text-white/10 text-[10px] mt-1">Secure Environment</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;