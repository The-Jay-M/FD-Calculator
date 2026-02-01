import React, { useState } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import { FDInput, FDResult } from '../types';

interface AIAdvisorProps {
  input: FDInput;
  result: FDResult;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ input, result }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    if (result.maturityAmount === 0) return;
    
    setLoading(true);
    setError(null);
    try {
      const adviceText = await getFinancialAdvice(input, result);
      setAdvice(adviceText);
    } catch (err) {
      setError("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl p-5 ios-shadow border border-[#cfdbe7] dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#0d141b] dark:text-white text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-yellow-500">auto_awesome</span>
          AI Insights
        </h3>
        
        {!advice && !loading && (
          <button
            onClick={handleGetAdvice}
            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-bold transition-colors uppercase tracking-wide"
          >
            Analyze
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-6 space-y-3">
          <span className="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
          <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">Consulting Gemini...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800">
          <span className="material-symbols-outlined">error</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {advice && !loading && (
        <div className="space-y-4">
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <div className="whitespace-pre-line leading-relaxed text-[#0d141b] dark:text-gray-300">
              {advice}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <button 
              onClick={handleGetAdvice} 
              className="text-xs text-gray-500 hover:text-primary flex items-center gap-1 transition-colors font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span> Refresh Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;