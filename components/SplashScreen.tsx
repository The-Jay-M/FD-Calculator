import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade out after 2s
    const timer = setTimeout(() => setFading(true), 2200);
    // Unmount after animation finishes
    const finish = setTimeout(onFinish, 2700);
    return () => { clearTimeout(timer); clearTimeout(finish); };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#101622] flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative mb-6">
         <div className="w-28 h-28 rounded-full bg-primary/20 animate-ping absolute inset-0"></div>
         <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-blue-900 animate-pulse blur-xl absolute inset-0"></div>
         <img src="https://cdn-icons-png.flaticon.com/512/2534/2534204.png" className="w-28 h-28 relative z-10 drop-shadow-2xl" alt="Logo" />
      </div>
      <h1 className="text-white text-3xl font-bold tracking-widest uppercase font-display">Smart FD</h1>
      <p className="text-gold/80 text-xs mt-2 font-medium tracking-[0.3em] uppercase">Premium Finance</p>
      
      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/2 animate-[shimmer_1s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};
export default SplashScreen;