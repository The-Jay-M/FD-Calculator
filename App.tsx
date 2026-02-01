import React, { useState, useEffect } from 'react';
import { SavedInvestment } from './types';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Assets from './components/Assets';
import Settings from './components/Settings';
import Navigation, { Tab } from './components/Navigation';
import SplashScreen from './components/SplashScreen';
import { formatCurrency, formatDate } from './utils/financial';

const App: React.FC = () => {
  // Application State
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Data State
  const [savedInvestments, setSavedInvestments] = useState<SavedInvestment[]>([]);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('smart_fd_investments');
    if (saved) {
      try {
        setSavedInvestments(JSON.parse(saved));
      } catch (e) { console.error(e); }
    }
  }, []);

  const saveToStorage = (inv: SavedInvestment[]) => {
    localStorage.setItem('smart_fd_investments', JSON.stringify(inv));
    setSavedInvestments(inv);
  };

  const handleSaveInvestment = (inv: SavedInvestment) => {
    const updated = [inv, ...savedInvestments];
    saveToStorage(updated);
    setShowCalculator(false);
    setActiveTab('assets'); // Switch to assets view to see new item
  };
  
  const handleDelete = (id: string) => {
     const updated = savedInvestments.filter(i => i.id !== id);
     saveToStorage(updated);
     setSelectedCert(null);
  };

  const handleResetData = () => {
      if(confirm('Are you sure you want to delete all data? This cannot be undone.')) {
          saveToStorage([]);
          setActiveTab('home');
      }
  };

  // View Routing Logic
  const renderContent = () => {
      switch (activeTab) {
          case 'home':
              return <Dashboard investments={savedInvestments} onInitiateDeposit={() => setShowCalculator(true)} />;
          case 'assets':
              return <Assets investments={savedInvestments} onViewCertificate={setSelectedCert} onAddNew={() => setShowCalculator(true)} />;
          case 'settings':
              return <Settings onResetData={handleResetData} />;
          default:
              return null;
      }
  };

  // Certificate Logic
  const activeCert = savedInvestments.find(i => i.id === selectedCert);

  if (loading) {
      return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="bg-background-dark min-h-screen text-white font-display max-w-md mx-auto relative overflow-hidden shadow-2xl">
      
      {/* Main Content Area */}
      <main className="h-full pb-0">
         {renderContent()}
      </main>

      {/* Bottom Navigation (Hidden if Calculator is open) */}
      {!showCalculator && (
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* Calculator Overlay - Full Screen Modal Transition */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-background-dark animate-in slide-in-from-bottom duration-300">
            <Calculator 
                onBack={() => setShowCalculator(false)}
                onSave={handleSaveInvestment}
            />
        </div>
      )}

      {/* Certificate Overlay Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-[#fffbf0] text-[#1a1a1a] w-full max-w-sm rounded-lg shadow-2xl overflow-hidden relative font-serif transform transition-all scale-100">
             <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none m-1"></div>
             {/* Watermark */}
             <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-9xl">verified_user</span>
             </div>

             <div className="p-8 text-center space-y-6 relative z-10">
                <div className="flex justify-center">
                   <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[#d4af37] text-4xl">verified</span>
                   </div>
                </div>
                <div>
                   <h2 className="text-2xl font-bold tracking-wide uppercase text-[#0d141b]">Certificate</h2>
                   <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">Investment Record</p>
                </div>
                
                <div className="py-6 border-t border-b border-[#d4af37]/30 space-y-4 text-left">
                   <div className="flex justify-between font-sans text-sm">
                       <span className="text-gray-500 uppercase text-[10px] tracking-wider mt-1">Principal</span>
                       <span className="font-bold text-lg text-[#0d141b]">{formatCurrency(activeCert.principal)}</span>
                   </div>
                   <div className="flex justify-between font-sans text-sm">
                       <span className="text-gray-500 uppercase text-[10px] tracking-wider mt-1">Maturity Date</span>
                       <span className="font-bold text-[#0d141b]">{formatDate(activeCert.maturityDate)}</span>
                   </div>
                   <div className="flex justify-between font-sans pt-3 border-t border-dashed border-gray-300 mt-2">
                       <span className="text-[#d4af37] font-bold uppercase text-sm">Total Value</span>
                       <span className="font-bold text-2xl text-[#d4af37]">{formatCurrency(activeCert.maturityAmount)}</span>
                   </div>
                </div>

                <div className="flex gap-3 font-sans">
                   <button onClick={() => setSelectedCert(null)} className="flex-1 bg-[#0d141b] text-white py-3 rounded-lg font-bold text-sm hover:bg-black transition-colors shadow-lg">Close</button>
                   <button onClick={() => handleDelete(activeCert.id!)} className="px-4 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"><span className="material-symbols-outlined text-xl">delete</span></button>
                </div>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;