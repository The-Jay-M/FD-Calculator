import React, { useState, useEffect } from 'react';
import { SavedInvestment } from '../types';
import { calculateEarlyWithdrawal, formatCurrency } from '../utils/financial';

interface EarlyExitPreviewProps {
  investment: SavedInvestment;
  onBack: () => void;
  onConfirm: () => void;
}

const EarlyExitPreview: React.FC<EarlyExitPreviewProps> = ({ investment, onBack, onConfirm }) => {
  const [withdrawalDate, setWithdrawalDate] = useState(new Date().toISOString().split('T')[0]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const data = calculateEarlyWithdrawal(
    investment.principal,
    investment.rate,
    investment.startDate,
    withdrawalDate
  );

  const totalGrowth = ((data.payout - investment.principal) / investment.principal) * 100;
  
  // Calculate visualization widths
  const totalBarValue = data.accruedInterest > 0 ? data.accruedInterest : 1;
  const penaltyPercent = (data.penalty / totalBarValue) * 100;
  const retainedPercent = 100 - penaltyPercent;

  const remainingTime = new Date(investment.maturityDate).getTime() - new Date(withdrawalDate).getTime();
  const remainingDays = Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark font-display overflow-y-auto no-scrollbar">
      
      {/* TopAppBar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
        <button onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center cursor-pointer hover:bg-white/10 rounded-full justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Premature Termination</h2>
        <div className="flex w-24 items-center justify-end gap-1.5">
          <span className={`material-symbols-outlined text-sm ${isOffline ? 'text-gold-primary' : 'text-emerald-500'}`}>
            {isOffline ? 'cloud_off' : 'cloud_done'}
          </span>
          <p className={`${isOffline ? 'text-gold-primary' : 'text-emerald-500'} text-xs font-bold leading-normal tracking-[0.015em] shrink-0 uppercase`}>
            {isOffline ? 'Offline' : 'Synced'}
          </p>
        </div>
      </div>

      {/* HeadlineText */}
      <div className="px-4 pt-6 pb-2">
        <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight text-center">Early Withdrawal Preview</h3>
        <div className="h-1 w-12 bg-gold-primary mx-auto mt-2 rounded-full"></div>
      </div>

      {/* BodyText */}
      <div className="px-6 mb-4">
        <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-relaxed text-center">
          Review the financial impact of terminating your fixed deposit before the maturity date. Data is calculated and stored locally.
        </p>
      </div>

      {/* Date Picker (Added functionality) */}
      <div className="px-4 pb-2">
         <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 rounded-xl p-3 flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Simulation Date</label>
            <input 
                type="date" 
                value={withdrawalDate}
                min={investment.startDate}
                max={investment.maturityDate}
                onChange={(e) => setWithdrawalDate(e.target.value)}
                className="bg-transparent border-none text-right text-slate-900 dark:text-white font-bold text-sm focus:ring-0 p-0 [color-scheme:dark]"
            />
         </div>
      </div>

      {/* Penalty Alert Box */}
      <div className="px-4 pt-2">
        <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-accent-red/20 p-2 rounded-lg">
            <span className="material-symbols-outlined text-accent-red">warning</span>
          </div>
          <div>
            <p className="text-accent-red font-bold text-sm">20% Penalty Charge Applied</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Based on remaining term ({remainingDays} days)</p>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="flex flex-col gap-4 p-4 mt-2">
        {/* Main Stats */}
        <div className="flex gap-4">
          <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-5 bg-slate-100 dark:bg-navy-card border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Accrued Interest</p>
            <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">{formatCurrency(data.accruedInterest)}</p>
            <div className="flex items-center gap-1 text-emerald-500">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <p className="text-xs font-semibold">+{totalGrowth.toFixed(2)}% Growth</p>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-5 bg-gold-primary/10 border-2 border-gold-primary/40">
            <p className="text-gold-primary font-medium text-xs uppercase tracking-wider">Net Payout</p>
            <p className="text-gold-primary tracking-tight text-xl font-bold leading-tight">{formatCurrency(data.payout)}</p>
            <div className="flex items-center gap-1 text-gold-primary/70">
              <span className="material-symbols-outlined text-sm">save</span>
              <p className="text-xs font-semibold uppercase tracking-tighter">Locally Stored</p>
            </div>
          </div>
        </div>

        {/* Visualization Section */}
        <div className="bg-slate-100 dark:bg-navy-card rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold text-sm">Interest Loss Visualization</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Retained vs. Penalty Loss</p>
            </div>
            <p className="text-accent-red text-sm font-bold">-{formatCurrency(data.penalty)}</p>
          </div>
          {/* Simple Bar Visual */}
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full flex overflow-hidden">
            <div className="h-full bg-gold-primary transition-all duration-500" style={{ width: `${retainedPercent}%` }}></div>
            <div className="h-full bg-accent-red transition-all duration-500" style={{ width: `${penaltyPercent}%` }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-gold-primary"></div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Earned ({Math.round(retainedPercent)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2 rounded-full bg-accent-red"></div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Penalty ({Math.round(penaltyPercent)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Detail */}
      <div className="px-4">
        <h3 className="text-slate-900 dark:text-white text-md font-bold leading-tight tracking-[-0.015em] pt-2">Breakdown Detail</h3>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Principal Amount</span>
            <span className="text-slate-900 dark:text-white text-sm font-semibold">{formatCurrency(investment.principal)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Interest at Current Date</span>
            <span className="text-slate-900 dark:text-white text-sm font-semibold">+{formatCurrency(data.accruedInterest)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-accent-red text-sm font-medium">Premature Penalty (20%)</span>
            <span className="text-accent-red text-sm font-bold">-{formatCurrency(data.penalty)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-slate-900 dark:text-white text-base font-bold">Total Estimated Payout</span>
            <span className="text-gold-primary text-lg font-black">{formatCurrency(data.payout)}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-auto p-4 pb-10 flex flex-col gap-3">
        <button onClick={onConfirm} className="w-full bg-gold-primary hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-colors shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2">
          <span>Proceed to Withdraw</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
        <button onClick={onBack} className="w-full bg-transparent border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          Keep Investment
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-2 px-6">
          *Final values may vary slightly upon synchronization with the central server. All offline calculations are based on the latest cached rates.
        </p>
      </div>

      {/* iOS Bottom Indicator */}
      <div className="flex justify-center pb-2">
        <div className="h-1.5 w-32 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default EarlyExitPreview;