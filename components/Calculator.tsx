import React, { useState, useEffect } from 'react';
import { FDInput, FDResult, TenureType, CompoundingFrequency, SavedInvestment } from '../types';
import { calculateFD, MINIMUM_INVESTMENT } from '../utils/financial';
import Results from './Results';
import AIAdvisor from './AIAdvisor';

interface CalculatorProps {
  onBack: () => void;
  onSave: (inv: SavedInvestment) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onBack, onSave }) => {
  const [input, setInput] = useState<FDInput>({
    title: '',
    principal: 250000,
    rate: 6.5,
    tenureValue: 2,
    tenureType: TenureType.YEARS,
    compoundingFrequency: CompoundingFrequency.QUARTERLY,
    startDate: new Date().toISOString().split('T')[0],
  });

  const [result, setResult] = useState<FDResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
     handleCalculate();
  }, [input]);

  const handleInputChange = (field: keyof FDInput, value: any) => {
    setInput((prev) => ({ ...prev, [field]: value }));
    if (field === 'principal') {
       if (value < MINIMUM_INVESTMENT) {
         setValidationError(`Min: $${(MINIMUM_INVESTMENT/1000).toFixed(0)}K`);
       } else {
         setValidationError(null);
       }
    }
  };

  const handleCalculate = () => {
    if (input.principal >= MINIMUM_INVESTMENT) {
      setResult(calculateFD(input));
    } else {
        setResult(null);
    }
  };

  const handleSave = () => {
    if (!result) return;
    const newInvestment: SavedInvestment = {
      ...input,
      ...result,
      title: input.title || 'Fixed Deposit',
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    onSave(newInvestment);
    onBack();
  };

  return (
    <div className="h-full bg-background-dark text-white flex flex-col max-w-md mx-auto relative overflow-y-auto no-scrollbar pb-24">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 border-b border-white/5">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center pr-8 text-white">New Strategy</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Input Card */}
        <div className="glass-card rounded-2xl p-5 space-y-5 shadow-2xl">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Goal Name</label>
            <input 
                type="text"
                placeholder="e.g. Wedding Fund, Dream Car"
                value={input.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-medium focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-white/20"
            />
          </div>

          {/* Principal */}
          <div className="space-y-2">
            <div className="flex justify-between">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Principal Amount</label>
                {validationError && <span className="text-red-400 text-xs font-bold">{validationError}</span>}
            </div>
            <div className="relative group">
               <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40">attach_money</span>
               <input 
                  type="number"
                  value={input.principal}
                  onChange={(e) => handleInputChange('principal', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-lg font-bold focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-white/20"
               />
            </div>
            <input 
               type="range" 
               min={MINIMUM_INVESTMENT} 
               max={1000000} 
               step={10000}
               value={input.principal}
               onChange={(e) => handleInputChange('principal', parseFloat(e.target.value))}
               className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
            />
          </div>

          {/* Rate & Tenure */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Rate (%)</label>
               <input 
                  type="number" 
                  step="0.1"
                  value={input.rate}
                  onChange={(e) => handleInputChange('rate', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:ring-1 focus:ring-primary outline-none"
               />
            </div>
            <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Duration (Years)</label>
                <input 
                  type="number"
                  min="1"
                  value={input.tenureValue}
                  onChange={(e) => handleInputChange('tenureValue', parseFloat(e.target.value) || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:ring-1 focus:ring-primary outline-none"
               />
            </div>
          </div>
          
           {/* Date */}
           <div className="space-y-2">
             <label className="text-white/60 text-xs font-bold uppercase tracking-wider">Start Date</label>
             <input 
                type="date"
                value={input.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-bold focus:ring-1 focus:ring-primary outline-none [color-scheme:dark]"
             />
           </div>

        </div>

        {/* Dynamic Results */}
        {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 space-y-4">
                <Results result={result} onReset={() => {}} onSave={handleSave} isSaved={false} />
                <AIAdvisor input={input} result={result} />
            </div>
        )}
      </main>
    </div>
  );
};

export default Calculator;