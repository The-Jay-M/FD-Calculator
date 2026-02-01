import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface SettingsProps {
  onResetData: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const Settings: React.FC<SettingsProps> = ({ onResetData, userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.name);
  const [address, setAddress] = useState(userProfile.address);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(userProfile.name);
    setAddress(userProfile.address);
  }, [userProfile]);

  const handleSave = () => {
    onUpdateProfile({ name, address });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-dark pb-32 animate-in slide-in-from-right duration-300">
      <div className="p-6 pt-12">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-white/40 text-sm">Preferences & Personal Details</p>
      </div>

      <div className="px-4 space-y-6">
        {/* Profile Section */}
        <section className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Investor Profile</h3>
            <div className="bg-card-dark rounded-xl border border-white/5 p-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase">Full Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-white/60 text-xs font-bold uppercase">Address</label>
                    <textarea 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 123 Wall Street, NY"
                        rows={2}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                </div>
                <button 
                    onClick={handleSave}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${saved ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-blue-600'}`}
                >
                    {saved ? 'Saved Successfully' : 'Update Profile'}
                </button>
            </div>
        </section>

        {/* App Settings */}
        <section className="space-y-3">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest ml-1">Application</h3>
            <div className="bg-card-dark rounded-xl border border-white/5 overflow-hidden">
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
            <p className="text-white/20 text-xs font-mono">v2.1.0</p>
            <p className="text-white/10 text-[10px] mt-1">Encrypted Local Storage</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;