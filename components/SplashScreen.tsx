import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Progress bar animation logic
    const duration = 2400; // time to reach 100%
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Fade out and unmount logic
    const fadeTimer = setTimeout(() => {
        setFading(true);
    }, duration + 200);

    const finishTimer = setTimeout(() => {
        onFinish();
    }, duration + 800); // Allow time for opacity transition

    return () => {
        clearInterval(timer);
        clearTimeout(fadeTimer);
        clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-splash-dark flex flex-col items-center justify-between p-8 overflow-hidden font-grotesk transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Top Spacer for iOS Status Bar */}
        <div className="h-12 w-full"></div>
        
        {/* Central 3D Asset Area */}
        <div className="relative flex flex-col items-center justify-center grow w-full">
            {/* Radial Backdrop Glow */}
            <div className="absolute w-[500px] h-[500px] radial-glow rounded-full"></div>
            
            {/* 3D Asset Container */}
            <div className="animate-bounce-soft flex flex-col items-center z-10">
                <div className="relative group">
                    {/* Placeholder for Isometric 3D Gold Coin/Safe with Bars */}
                    <div className="w-64 h-64 bg-center bg-no-repeat bg-contain" data-alt="3D isometric gold coin" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC13t2rTe6BFx8R9oA2kATogHFyMu8PeuMOLLeA8fM-3zTVKnxd4Ll6rUkcdwdQYUYp6pLs9bbftU13OQiff464OKtjvFA3KdLL2I8JKsbSjZ0c2EJAZJSA7H7owjNKz-9mXD-8crvz9AbJT3HK7HKgcJSgJ4nc1Be3sZY5QVxWaQxWfBVBA_8Y0IbvJOAct-Ps8hvox6ob97J9JXZUvnKO-k2H3zg2hiyde1qGucqU8OdjHsSBPKmNgY8nJglAusWyKRWFEaBVL_k")'}}>
                    </div>
                    {/* Reflection Glow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-gold-primary/20 blur-xl rounded-full"></div>
                </div>
                
                {/* Branding below Asset */}
                <div className="mt-12 text-center">
                    <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight pb-1">
                        Premium <span className="text-gold-primary">Fixed Deposit</span>
                    </h1>
                    <p className="text-white/60 text-sm tracking-widest uppercase font-medium">Asset Management</p>
                </div>
            </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="w-full flex flex-col items-center gap-8 z-20 pb-10">
            {/* Loading State Component */}
            <div className="w-full max-w-[240px] flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <p className="text-white/80 text-xs font-medium leading-none">Initializing secure vault...</p>
                    <p className="text-gold-primary text-xs font-bold leading-none">{Math.round(progress)}%</p>
                </div>
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gold-primary transition-all duration-75 ease-out" style={{width: `${progress}%`}}></div>
                </div>
            </div>
            
            {/* Brand Identity & Tech Badge */}
            <div className="flex flex-col items-center gap-4">
                {/* Mini Logo */}
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gold-primary/10 border border-gold-primary/20">
                        <span className="material-symbols-outlined text-gold-primary text-xl">account_balance_wallet</span>
                    </div>
                    <span className="text-white font-bold text-lg">GOLDVAULT</span>
                </div>
                {/* Powered By Badge */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px] text-gold-primary mr-2">database</span>
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Powered by Local Storage</p>
                </div>
            </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[10%] left-[5%] w-px h-24 bg-gradient-to-b from-transparent via-gold-primary to-transparent"></div>
            <div className="absolute bottom-[20%] right-[8%] w-px h-32 bg-gradient-to-b from-transparent via-gold-primary/40 to-transparent"></div>
        </div>
    </div>
  );
};
export default SplashScreen;