import React from 'react';

export type Tab = 'home' | 'assets' | 'settings';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const getTabClass = (tab: Tab) => 
    `flex flex-col items-center gap-1 transition-all duration-300 w-16 py-2 rounded-xl ${activeTab === tab ? 'text-primary bg-primary/10' : 'text-gray-500 active:scale-95'}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101622]/95 backdrop-blur-xl border-t border-white/5 flex justify-around p-3 pb-6 z-40 max-w-md mx-auto shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
      <button onClick={() => onTabChange('home')} className={getTabClass('home')}>
        <span className={`material-symbols-outlined text-2xl ${activeTab === 'home' ? 'font-variation-fill-1' : ''}`}>dashboard</span>
        <span className="text-[10px] font-bold">Home</span>
      </button>
      <button onClick={() => onTabChange('assets')} className={getTabClass('assets')}>
        <span className={`material-symbols-outlined text-2xl ${activeTab === 'assets' ? 'font-variation-fill-1' : ''}`}>account_balance_wallet</span>
        <span className="text-[10px] font-bold">Assets</span>
      </button>
      <button onClick={() => onTabChange('settings')} className={getTabClass('settings')}>
        <span className={`material-symbols-outlined text-2xl ${activeTab === 'settings' ? 'font-variation-fill-1' : ''}`}>settings</span>
        <span className="text-[10px] font-bold">Settings</span>
      </button>
    </div>
  );
};
export default Navigation;