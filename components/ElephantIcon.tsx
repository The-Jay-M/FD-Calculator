import React from 'react';

export const ElephantIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} width="100%" height="100%">
    <defs>
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8baec9" />
        <stop offset="100%" stopColor="#5d7f99" />
      </linearGradient>
      
      <linearGradient id="legFarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4a6b82" />
        <stop offset="100%" stopColor="#2f4859" />
      </linearGradient>
      
      <linearGradient id="earGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9dbbd3" />
        <stop offset="100%" stopColor="#6b8ca8" />
      </linearGradient>
      
      <linearGradient id="tuskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdfdfd" />
        <stop offset="100%" stopColor="#e0e0d0" />
      </linearGradient>

      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
        <feOffset dx="0" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/> 
        </feMerge>
      </filter>
    </defs>

    <ellipse cx="256" cy="430" rx="180" ry="20" fill="#2a3b47" opacity="0.2" />

    <path d="M140,280 L140,380 C140,400 130,420 150,420 L190,420 C200,420 200,400 200,380 L210,280 Z" fill="url(#legFarGradient)" />
    <path d="M155,420 C155,415 165,415 165,420 Z" fill="#e0e0d0" opacity="0.6"/>
    <path d="M170,420 C170,415 180,415 180,420 Z" fill="#e0e0d0" opacity="0.6"/>

    <path d="M320,280 L340,380 C340,400 330,415 350,415 L390,415 C400,415 400,400 390,380 L380,280 Z" fill="url(#legFarGradient)" />
    <path d="M355,415 C355,410 365,410 365,415 Z" fill="#e0e0d0" opacity="0.6"/>
    <path d="M370,415 C370,410 380,410 380,415 Z" fill="#e0e0d0" opacity="0.6"/>

    <path d="M80,240 Q60,300 70,350" stroke="#5d7f99" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M65,350 Q70,365 75,350 M70,350 L70,365" stroke="#4a6b82" strokeWidth="3" fill="none"/>

    <path d="M110,280 
             C90,280 80,200 120,160 
             C160,120 250,130 300,140 
             C330,100 380,80 420,100 
             C450,115 460,150 450,180 
             C445,220 450,260 460,300 
             C465,320 455,330 440,325 
             C430,320 425,300 420,260 
             C410,280 380,280 360,250 
             L360,280 
             L110,280 Z" 
             fill="url(#bodyGradient)" />

    <path d="M110,260 L100,380 C100,400 90,425 110,425 L150,425 C160,425 160,400 160,380 L170,260 Z" fill="url(#bodyGradient)" />
    
    <path d="M115,425 C115,415 125,415 125,425 Z" fill="#fdfdfd"/>
    <path d="M130,425 C130,415 140,415 140,425 Z" fill="#fdfdfd"/>
    <path d="M145,425 C145,415 155,415 155,425 Z" fill="#fdfdfd"/>

    <path d="M320,250 L320,350 C320,370 310,390 330,390 L370,390 C380,390 380,370 380,350 L390,250 Z" fill="url(#bodyGradient)" />
    
    <path d="M335,390 C335,380 345,380 345,390 Z" fill="#fdfdfd"/>
    <path d="M350,390 C350,380 360,380 360,390 Z" fill="#fdfdfd"/>

    <path d="M170,280 Q250,300 320,280" fill="none" stroke="#4a6b82" strokeWidth="20" opacity="0.3" filter="url(#softShadow)"/>

    <path d="M400,230 Q440,260 450,210 L440,210 Q430,240 400,225 Z" fill="url(#tuskGradient)" stroke="#ccc" strokeWidth="1"/>

    <path d="M425,240 Q440,245 455,240" fill="none" stroke="#4a6b82" strokeWidth="2" opacity="0.5"/>
    <path d="M430,260 Q445,265 460,260" fill="none" stroke="#4a6b82" strokeWidth="2" opacity="0.5"/>
    <path d="M435,280 Q450,285 460,280" fill="none" stroke="#4a6b82" strokeWidth="2" opacity="0.5"/>

    <path d="M330,150 
             C380,150 400,180 390,220 
             C380,260 350,290 310,270 
             C280,250 290,180 330,150 Z" 
             fill="url(#earGradient)" filter="url(#softShadow)"/>
    
    <path d="M330,160 C360,160 370,180 360,220" fill="none" stroke="#8baec9" strokeWidth="3" opacity="0.6"/>

    <circle cx="395" cy="175" r="5" fill="#2f4859" />
    <circle cx="397" cy="173" r="1.5" fill="#ffffff" />

    <ellipse cx="380" cy="120" rx="30" ry="10" fill="#ffffff" opacity="0.2" transform="rotate(-20 380 120)"/>
    <ellipse cx="200" cy="160" rx="60" ry="15" fill="#ffffff" opacity="0.15" />
  </svg>
);