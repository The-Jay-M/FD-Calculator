import React from 'react';
import { FDResult } from '../types';
import { formatCurrency, formatDate } from '../utils/financial';

interface ResultsProps {
  result: FDResult;
  onReset: () => void;
  onSave: () => void;
  isSaved: boolean;
}

const Results: React.FC<ResultsProps> = ({ result, onReset, onSave, isSaved }) => {
  const returnPercentage = ((result.totalInterest / result.principal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-2xl p-6 space-y-6">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
            Maturity Value ({formatDate(result.maturityDate)})
          </p>
          <h2 className="text-primary text-4xl font-extrabold tracking-tight break-words">
            {formatCurrency(result.maturityAmount)}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10 dark:border-primary/20">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Total Interest</p>
            <p className="text-[#0d141b] dark:text-white text-lg font-bold break-words">
              {formatCurrency(result.totalInterest)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-1">Net Returns</p>
            <p className="text-green-600 dark:text-green-400 text-lg font-bold">
              +{returnPercentage}%
            </p>
          </div>
        </div>

        {/* Early Exit Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-100 dark:border-red-900/30">
          <div className="flex items-start gap-3">
             <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
             <div className="space-y-1">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">Early Exit Condition</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  A 20% penalty on interest applies if withdrawn before maturity.
                </p>
                <div className="flex justify-between pt-2 text-sm">
                   <span className="text-gray-500">Penalty Amount:</span>
                   <span className="text-red-500 font-semibold">-{formatCurrency(result.penaltyAmount)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-dashed border-gray-200 dark:border-gray-700 pt-1 mt-1">
                   <span className="text-[#0d141b] dark:text-white font-medium">Early Exit Value:</span>
                   <span className="text-[#0d141b] dark:text-white font-bold">{formatCurrency(result.earlyExitAmount)}</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onReset}
          className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          Reset
        </button>
        <button 
          onClick={onSave}
          disabled={isSaved}
          className={`py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white shadow-lg ${isSaved ? 'bg-green-600 cursor-default' : 'bg-[#0d141b] dark:bg-slate-700 hover:bg-black'}`}
        >
          {isSaved ? (
             <>
               <span className="material-symbols-outlined text-[18px]">check</span> Saved
             </>
          ) : (
             <>
               <span className="material-symbols-outlined text-[18px]">bookmark</span> Save
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Results;
