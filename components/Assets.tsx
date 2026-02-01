import React from 'react';
import { SavedInvestment } from '../types';
import { formatCurrency, formatDate } from '../utils/financial';

interface AssetsProps {
  investments: SavedInvestment[];
  onViewCertificate: (id: string) => void;
  onAddNew: () => void;
}

const Assets: React.FC<AssetsProps> = ({ investments, onViewCertificate, onAddNew }) => {
  const totalPrincipal = investments.reduce((acc, inv) => acc + inv.principal, 0);
  
  return (
    <div className="flex flex-col h-full min-h-screen bg-background-dark pb-24 animate-in slide-in-from-right duration-300">
      <div className="p-6 pt-12 sticky top-0 bg-background-dark/95 backdrop-blur-md z-30 border-b border-white/5">
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-bold text-white mb-1">Portfolio</h2>
                <p className="text-white/40 text-sm">Your active positions</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-primary font-bold uppercase tracking-wider">Total Principal</p>
                <p className="text-xl text-white font-mono font-bold">{formatCurrency(totalPrincipal)}</p>
            </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {investments.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
             <span className="material-symbols-outlined text-6xl text-white/20">folder_open</span>
             <p className="text-white/60">No active investments found.</p>
             <button onClick={onAddNew} className="text-primary font-bold text-sm">Start a new deposit</button>
           </div>
        ) : (
          investments.map((inv) => (
             <div 
                key={inv.id} 
                onClick={() => inv.id && onViewCertificate(inv.id)} 
                className="group relative p-5 rounded-2xl bg-[#1a2230] border border-white/5 hover:border-primary/30 transition-all active:scale-[0.98]"
             >
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-white font-bold text-xl tracking-tight">{formatCurrency(inv.principal)}</h3>
                    <p className="text-white/40 text-xs mt-1 font-mono">{inv.id?.slice(0, 8).toUpperCase()}</p>
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <span className="text-gold text-[10px] font-bold border border-gold/30 px-2 py-1 rounded-full bg-gold/5 uppercase tracking-wide">
                        {inv.tenureValue} {inv.tenureType}
                    </span>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold">Interest Rate</p>
                    <p className="text-white font-medium">{inv.rate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px] uppercase font-bold">Maturity Date</p>
                    <p className="text-white font-medium">{formatDate(inv.maturityDate)}</p>
                  </div>
               </div>

               <div className="flex justify-between items-center pt-2">
                 <div className="flex items-center gap-1 text-emerald-400">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    <span className="text-xs font-bold">+{formatCurrency(inv.totalInterest)}</span>
                 </div>
                 <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors">chevron_right</span>
               </div>
             </div>
          ))
        )}
        
        {/* Add New Button at bottom of list */}
        {investments.length > 0 && (
            <button 
                onClick={onAddNew}
                className="w-full py-4 rounded-xl border border-dashed border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined">add_circle</span>
                Add Another Investment
            </button>
        )}
      </div>
    </div>
  );
};

export default Assets;