import React from 'react';

interface LandingProps {
  onStart: () => void;
  onViewPortfolio: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart, onViewPortfolio }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0b1120] relative overflow-hidden font-display">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 z-10">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">diamond</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#0d141b] dark:text-white leading-tight tracking-tight">
            Grow your wealth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Smart FD</span>
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md mx-auto">
            Secure high-yield returns with our premium fixed deposit calculator. Designed for elite investors starting at $100k.
          </p>

          <div className="pt-8 space-y-4">
            <button 
              onClick={onStart}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
            >
              Start Calculation
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            <button 
              onClick={onViewPortfolio}
              className="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-[#0d141b] dark:text-white font-semibold py-4 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">folder_special</span>
              Offline Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 text-center z-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
          Trusted by Elite Investors
        </p>
      </div>
    </div>
  );
};

export default Landing;
