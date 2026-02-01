import React, { useEffect, useState } from 'react';
import { SavedInvestment } from '../types';
import { formatCurrency } from '../utils/financial';
import { calculateProgress, getTimeRemaining, TimeRemaining } from '../utils/time';

interface DashboardProps {
  investments: SavedInvestment[];
  onInitiateDeposit: () => void;
  onViewCertificate: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ investments, onInitiateDeposit, onViewCertificate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
  
  // Aggregate Data
  const totalValue = investments.reduce((acc, inv) => acc + inv.maturityAmount, 0);
  const totalPrincipal = investments.reduce((acc, inv) => acc + inv.principal, 0);
  const totalInterest = totalValue - totalPrincipal;
  const yieldPercentage = totalPrincipal > 0 ? (totalInterest / totalPrincipal) * 100 : 0;

  // Find nearest maturity date
  const activeInvestments = investments.filter(i => new Date(i.maturityDate).getTime() > Date.now());
  const nearestInvestment = activeInvestments.sort((a, b) => 
    new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime()
  )[0];

  // Timer Logic
  useEffect(() => {
    if (!nearestInvestment) return;
    
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(nearestInvestment.maturityDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [nearestInvestment]);

  // Calculate overall progress (weighted average or based on nearest)
  const progress = nearestInvestment 
    ? calculateProgress(nearestInvestment.startDate, nearestInvestment.maturityDate) 
    : 0;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden max-w-md mx-auto shadow-2xl">
      {/* TopAppBar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5">
        <div className="flex size-10 shrink-0 items-center">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/50" 
               style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAf-34HZbSJ4_71ARQCBBlLcRBqVfMVXhed04rIiK_nJLKuuJJ35N_eets00HJ3zim-NyILpgnOWGplVgnEAT247xCKmLO-AALf6U-fkDC8iNvr-pJr-j1jKdfdUTSX2mM07laADRLqOPihoo2di-4PNe2_h1nGbo1_9t32EL_OwnJf8bFN0X0IKSvUPLMeUpnHTnbcNgTAdbWEIM6yV3sgaOZpBg-OUMIoE67z2C8pKLCGM1_gbcFMBnY3at3tiSN0ITBBKgPA8IQ")'}}>
          </div>
        </div>
        <div className="flex-1 px-4">
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase">Elite Member</p>
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Investment Hub</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-gold text-[22px]">notifications</span>
          </button>
        </div>
      </div>

      {/* Live Monitor Card */}
      <div className="p-4 @container mt-2">
        <div className="flex flex-col items-stretch justify-start rounded-xl glass-card overflow-hidden shadow-2xl relative">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
          <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover opacity-80 absolute inset-0 z-0" 
               style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4QU3g1wzPJXvwp2DdBAs-F2fApzO7ZP_02fgSqrr3ln5MebBC3xjhdASI_rVXnsfwqw-m_dv8DcOaRMyzmiaX9aXZo2Evn6gO9MBDHxRgtJHMVAc9wo_7jR9VlVtcCWYJnXSb9maKTUNCWFFclb6Wv0LgiFf1eVKsGz8PHACGhkff27XF2LD5JAMy0T7YwH0MjNI3LQAOvl-U8qScGEZIVw_TnmW1CK6FdfG-E4lEHiI9fLapzGDx8vh5jP_hbnnLq5HpLjSfC2Y")'}}>
          </div>
          
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 p-6 relative z-10">
            <div className="flex justify-between items-center mb-1">
              <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase">Live Investment Monitor</p>
              {activeInvestments.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <p className="text-emerald-400 text-[10px] font-bold">LIVE</p>
                </div>
              )}
            </div>
            
            <p className="text-white text-3xl font-bold leading-tight tracking-[-0.03em] tabular-nums">
              {formatCurrency(totalValue > 0 ? totalValue : 0)}
            </p>
            
            <div className="flex flex-col gap-1 mt-4">
              <p className="text-white/60 text-sm font-medium leading-normal flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                Yielding {yieldPercentage.toFixed(1)}% APY Fixed
              </p>
            </div>
          </div>

          {/* ProgressBar Component Integration */}
          <div className="px-6 pb-6 pt-0 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <p className="text-white/40 text-[11px] font-medium uppercase tracking-tighter">
                  {nearestInvestment ? 'Next Maturity Progress' : 'No Active Plans'}
                </p>
                <p className="text-white text-xs font-bold">{Math.round(progress)}%</p>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary premium-gradient shadow-[0_0_10px_rgba(15,73,189,0.5)] transition-all duration-1000" style={{width: `${progress}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timer Component (Maturity Countdown) */}
      <div className="px-4">
        <div className="flex gap-3 py-2 px-0 overflow-x-auto no-scrollbar">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds, highlight: true }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <p className={`text-xl font-bold leading-tight ${item.highlight ? 'text-gold' : 'text-white'}`}>
                {String(item.value).padStart(2, '0')}
              </p>
              <p className={`${item.highlight ? 'text-gold/40' : 'text-white/40'} text-[10px] uppercase font-bold tracking-widest`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SectionHeader: Project Your Returns */}
      <div className="mt-4">
        <h2 className="text-white text-xl font-bold leading-tight tracking-tight px-4 pb-1 pt-5">Strategic Planning</h2>
        <p className="text-white/40 text-sm px-4">Project your future wealth growth</p>
      </div>

      {/* Calculator Teaser / Portfolio List Section */}
      <div className="p-4 space-y-4">
        {investments.length === 0 ? (
           // Teaser if no investments
           <div className="p-5 rounded-xl glass-card border border-white/10" onClick={onInitiateDeposit}>
             <div className="flex justify-between items-center mb-4">
                <label className="text-white/60 text-sm font-medium">Investment Principal</label>
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/30 tracking-tight">$100K MIN</span>
             </div>
             <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-white/50">Start Calculation...</p>
                <button className="text-primary material-symbols-outlined bg-primary/10 p-2 rounded-full">arrow_forward</button>
             </div>
             <div className="h-1.5 w-full bg-white/10 rounded-full relative mb-8">
                <div className="absolute left-0 top-0 h-full bg-white/30 rounded-full w-[20%]"></div>
             </div>
           </div>
        ) : (
          // List of Investments
          investments.map((inv) => (
             <div key={inv.id} onClick={() => inv.id && onViewCertificate(inv.id)} className="p-4 rounded-xl glass-card border border-white/10 active:scale-[0.99] transition-transform">
               <div className="flex justify-between mb-2">
                 <h3 className="text-white font-bold text-lg">{formatCurrency(inv.principal)}</h3>
                 <span className="text-gold text-xs font-bold border border-gold/30 px-2 py-1 rounded bg-gold/10">Active</span>
               </div>
               <div className="flex justify-between text-sm text-white/50">
                 <span>{inv.tenureValue} {inv.tenureType} @ {inv.rate}%</span>
                 <span className="text-white">Mat: {formatCurrency(inv.maturityAmount)}</span>
               </div>
             </div>
          ))
        )}

        {/* Early Termination Warning Box */}
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-amber-500 text-4xl">warning</span>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
            <div className="flex flex-col gap-1">
              <h4 className="text-amber-500 text-sm font-bold uppercase tracking-wider">Early Termination Policy</h4>
              <p className="text-amber-200/70 text-xs leading-relaxed">
                Withdrawals before the maturity date are subject to a <span class="text-amber-500 font-bold">20% penalty</span> on all accrued interest. Principal remains protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-2 mb-8">
        <button 
          onClick={onInitiateDeposit}
          className="w-full bg-primary premium-gradient py-4 rounded-xl text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <span>Initiate New Deposit</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="text-center text-[10px] text-white/30 mt-4 px-8 uppercase tracking-[0.15em]">Institutional grade security • FDIC Insured</p>
      </div>

      {/* Bottom Tab Bar */}
      <div className="mt-auto sticky bottom-0 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 flex justify-around p-3 pb-6 z-40">
        <div className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined font-variation-fill-1">dashboard</span>
          <span className="text-[10px] font-bold">Monitor</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/40">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px] font-bold">Assets</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/40">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold">Insights</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/40">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
