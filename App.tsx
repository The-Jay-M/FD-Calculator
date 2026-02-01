import React, { useState, useEffect } from 'react';
import { SavedInvestment } from './types';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import { formatCurrency, formatDate } from './utils/financial';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'calculator'>('dashboard');
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
    setView('dashboard');
  };
  
  const handleDelete = (id: string) => {
     const updated = savedInvestments.filter(i => i.id !== id);
     saveToStorage(updated);
     setSelectedCert(null);
  };

  // Certificate Modal logic (Global level)
  const activeCert = savedInvestments.find(i => i.id === selectedCert);

  return (
    <>
      {view === 'dashboard' && (
        <Dashboard 
          investments={savedInvestments}
          onInitiateDeposit={() => setView('calculator')}
          onViewCertificate={setSelectedCert}
        />
      )}

      {view === 'calculator' && (
        <Calculator 
          onBack={() => setView('dashboard')}
          onSave={handleSaveInvestment}
        />
      )}

      {/* Certificate Overlay */}
      {activeCert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
           <div className="bg-[#fffbf0] text-[#1a1a1a] w-full max-w-md rounded-lg shadow-2xl overflow-hidden relative font-serif">
             <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none m-1"></div>
             <div className="p-8 text-center space-y-6 relative z-10">
                <div className="flex justify-center">
                   <span className="material-symbols-outlined text-[#d4af37] text-5xl">verified_user</span>
                </div>
                <div>
                   <h2 className="text-2xl font-bold tracking-wide uppercase text-[#0d141b]">Certificate</h2>
                   <p className="text-xs text-gray-500 uppercase tracking-widest">Investment Record</p>
                </div>
                <div className="py-4 border-t border-b border-[#d4af37]/30 space-y-3 text-left">
                   <div className="flex justify-between font-sans"><span className="text-gray-600">Principal</span><span className="font-bold">{formatCurrency(activeCert.principal)}</span></div>
                   <div className="flex justify-between font-sans"><span className="text-gray-600">Maturity Date</span><span className="font-bold">{formatDate(activeCert.maturityDate)}</span></div>
                   <div className="flex justify-between font-sans pt-2 border-t border-dashed border-gray-300"><span className="text-[#d4af37] font-bold">Value</span><span className="font-bold text-xl">{formatCurrency(activeCert.maturityAmount)}</span></div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setSelectedCert(null)} className="flex-1 bg-[#0d141b] text-[#d4af37] py-3 rounded font-bold hover:bg-black">Close</button>
                   <button onClick={() => handleDelete(activeCert.id!)} className="px-4 border border-red-200 text-red-500 rounded hover:bg-red-50"><span className="material-symbols-outlined">delete</span></button>
                </div>
             </div>
           </div>
        </div>
      )}
    </>
  );
};

export default App;