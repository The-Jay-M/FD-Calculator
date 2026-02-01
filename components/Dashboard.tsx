import React, { useEffect, useState } from 'react';
import { SavedInvestment } from '../types';
import { formatCurrency } from '../utils/financial';
import { calculateProgress, getTimeRemaining, TimeRemaining } from '../utils/time';
import { ElephantIcon } from './ElephantIcon';

interface DashboardProps {
  investments: SavedInvestment[];
  onInitiateDeposit: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ investments, onInitiateDeposit }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
  
  const totalValue = investments.reduce((acc, inv) => acc + inv.maturityAmount, 0);
  const totalPrincipal = investments.reduce((acc, inv) => acc + inv.principal, 0);
  const totalInterest = totalValue - totalPrincipal;
  const yieldPercentage = totalPrincipal > 0 ? (totalInterest / totalPrincipal) * 100 : 0;

  const activeInvestments = investments.filter(i => new Date(i.maturityDate).getTime() > Date.now());
  const nearestInvestment = activeInvestments.sort((a, b) => 
    new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime()
  )[0];

  useEffect(() => {
    if (!nearestInvestment) return;
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(nearestInvestment.maturityDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [nearestInvestment]);

  const progress = nearestInvestment 
    ? calculateProgress(nearestInvestment.startDate, nearestInvestment.maturityDate) 
    : 0;

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-dark pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">Welcome Back</p>
          <h1 className="text-white text-2xl font-bold">Overview</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-white">notifications</span>
        </div>
      </div>

      {/* Main Monitor Card */}
      <div className="px-4">
        <div className="flex flex-col items-stretch justify-start rounded-2xl glass-card overflow-hidden shadow-2xl relative border border-white/10">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 blur-[60px] rounded-full"></div>
          <div className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover opacity-60 absolute inset-0 z-0" 
               style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4QU3g1wzPJXvwp2DdBAs-F2fApzO7ZP_02fgSqrr3ln5MebBC3xjhdASI_rVXnsfwqw-m_dv8DcOaRMyzmiaX9aXZo2Evn6gO9MBDHxRgtJHMVAc9wo_7jR9VlVtcCWYJnXSb9maKTUNCWFFclb6Wv0LgiFf1eVKsGz8PHACGhkff27XF2LD5JAMy0T7YwH0MjNI3LQAOvl-U8qScGEZIVw_TnmW1CK6FdfG-E4lEHiI9fLapzGDx8vh5jP_hbnnLq5HpLjSfC2Y")'}}>
          </div>
          
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 p-6 relative z-10">
            <div className="flex justify-between items-center mb-2">
              <p className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">Total Portfolio Value</p>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <p className="text-emerald-400 text-[9px] font-bold">LIVE</p>
              </div>
            </div>
            
            <p className="text-white text-4xl font-bold leading-tight tracking-tight tabular-nums">
              {formatCurrency(totalValue > 0 ? totalValue : 0)}
            </p>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-xs font-bold">+{yieldPercentage.toFixed(1)}%</span>
              <p className="text-white/40 text-xs font-medium">Net Yield</p>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <p className="text-white/60 text-[10px] font-medium uppercase tracking-wider">
                  {nearestInvestment ? 'Maturity Progress' : 'No Active Plans'}
                </p>
                <p className="text-white text-xs font-bold">{Math.round(progress)}%</p>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full bg-gradient-to-r from-primary to-blue-400 shadow-[0_0_10px_rgba(15,73,189,0.5)] transition-all duration-1000" style={{width: `${progress}%`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 py-2 overflow-x-auto no-scrollbar">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds, highlight: true }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center justify-center gap-1 p-3 rounded-xl bg-[#1a2230] border border-white/5">
              <p className={`text-xl font-bold font-mono ${item.highlight ? 'text-primary' : 'text-white'}`}>
                {String(item.value).padStart(2, '0')}
              </p>
              <p className="text-white/30 text-[9px] uppercase font-bold tracking-widest">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action with Elephant Icon */}
      <div className="px-4 mt-6">
        <button 
          onClick={onInitiateDeposit}
          className="w-full relative overflow-hidden group bg-white text-[#0d141b] py-6 px-6 rounded-3xl font-bold shadow-xl shadow-white/5 active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="relative z-10 flex flex-col items-start gap-1">
            <span className="text-lg font-bold tracking-tight">New Smart Deposit</span>
            <span className="text-xs text-gray-500 font-medium">Create a high-yield strategy</span>
            <div className="mt-3 flex items-center gap-1 text-primary text-sm font-bold">
              <span>Start Calculation</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          
          <div className="absolute right-[-20px] bottom-[-40px] w-48 h-48 opacity-100 transform rotate-[-10deg] group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out">
              <ElephantIcon />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/50 pointer-events-none"></div>
        </button>
      </div>

      {/* Mini Insight */}
      <div className="px-4 mt-6">
        <h3 className="text-white text-sm font-bold mb-3">Market Pulse</h3>
        <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex gap-4 items-start">
             <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <span className="material-symbols-outlined">auto_awesome</span>
             </div>
             <div>
                <p className="text-white/80 text-sm leading-relaxed">
                   Current market conditions favor locking in long-term rates. Inflation indicators suggest a potential rate plateau.
                </p>
                <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">AI Generated Insight</p>
             </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;