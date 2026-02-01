import React, { useState } from 'react';
import { SavedInvestment, UserProfile } from '../types';
import { formatCurrency, formatDate } from '../utils/financial';
import EarlyExitPreview from './EarlyExitPreview';

interface InvestmentDetailsProps {
  investment: SavedInvestment;
  userProfile: UserProfile;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ investment, userProfile, onClose, onDelete }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'exit' | 'certificate'>('details');

  // If Early Exit mode is active, show the full screen component
  if (activeTab === 'exit') {
    return (
        <EarlyExitPreview 
            investment={investment} 
            onBack={() => setActiveTab('details')}
            onConfirm={() => onDelete(investment.id!)}
        />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background-dark relative">
        {/* Navigation Header */}
        <div className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center justify-between">
            <button onClick={onClose} className="text-white/60 hover:text-white flex items-center gap-1">
                <span className="material-symbols-outlined">expand_more</span>
                <span className="text-sm font-bold">Close</span>
            </button>
            <h2 className="text-white font-bold">{investment.title || 'Investment'}</h2>
            <button onClick={() => onDelete(investment.id!)} className="text-red-500 hover:text-red-400">
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 pb-0">
            <div className="bg-white/5 p-1 rounded-xl flex">
                {(['details', 'exit', 'certificate'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        {tab === 'exit' ? 'Simulate Exit' : tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* DETAILS TAB */}
            {activeTab === 'details' && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="text-center py-6">
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Maturity Value</p>
                        <h1 className="text-4xl font-bold text-white mt-2">{formatCurrency(investment.maturityAmount)}</h1>
                        <p className="text-emerald-400 text-sm font-bold mt-2 bg-emerald-400/10 inline-block px-3 py-1 rounded-full border border-emerald-400/20">
                            +{((investment.totalInterest / investment.principal) * 100).toFixed(1)}% Yield
                        </p>
                    </div>

                    <div className="bg-card-dark border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-white/5 flex justify-between">
                            <span className="text-white/60 text-sm">Principal</span>
                            <span className="text-white font-bold font-mono">{formatCurrency(investment.principal)}</span>
                        </div>
                        <div className="p-4 border-b border-white/5 flex justify-between">
                            <span className="text-white/60 text-sm">Interest Rate</span>
                            <span className="text-white font-bold font-mono">{investment.rate}%</span>
                        </div>
                        <div className="p-4 border-b border-white/5 flex justify-between">
                            <span className="text-white/60 text-sm">Start Date</span>
                            <span className="text-white font-bold font-mono">{formatDate(investment.startDate)}</span>
                        </div>
                        <div className="p-4 flex justify-between">
                            <span className="text-white/60 text-sm">Maturity Date</span>
                            <span className="text-white font-bold font-mono">{formatDate(investment.maturityDate)}</span>
                        </div>
                    </div>

                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 flex items-start gap-3">
                         <span className="material-symbols-outlined text-primary">verified</span>
                         <div>
                            <h4 className="text-white font-bold text-sm">Guaranteed Return</h4>
                            <p className="text-white/60 text-xs mt-1 leading-relaxed">
                                This investment is locked in at {investment.rate}% for {investment.tenureValue} {investment.tenureType}.
                            </p>
                         </div>
                    </div>
                </div>
            )}

            {/* CERTIFICATE TAB */}
            {activeTab === 'certificate' && (
                <div className="animate-in fade-in zoom-in-95 duration-300 flex justify-center py-4">
                     <div className="bg-[#fffbf0] text-[#1a1a1a] w-full max-w-sm rounded-lg shadow-2xl overflow-hidden relative font-serif">
                        <div className="absolute inset-2 border-2 border-[#d4af37] pointer-events-none m-1"></div>
                        <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                            <span className="material-symbols-outlined text-9xl">verified_user</span>
                        </div>

                        <div className="p-8 text-center space-y-6 relative z-10">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#d4af37] text-4xl">verified</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-wide uppercase text-[#0d141b]">Certificate</h2>
                                <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mt-1">Fixed Deposit Receipt</p>
                            </div>

                            <div className="text-left bg-[#fcf8e8] p-4 rounded border border-[#d4af37]/20">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Holder Details</p>
                                <p className="font-bold text-sm">{userProfile.name || 'Valued Customer'}</p>
                                <p className="text-xs text-gray-600 mt-1">{userProfile.address || 'Address on file'}</p>
                            </div>
                            
                            <div className="py-4 border-t border-b border-[#d4af37]/30 space-y-3 text-left">
                                <div className="flex justify-between font-sans text-sm">
                                    <span className="text-gray-500 uppercase text-[10px] tracking-wider mt-1">Principal</span>
                                    <span className="font-bold text-lg text-[#0d141b]">{formatCurrency(investment.principal)}</span>
                                </div>
                                <div className="flex justify-between font-sans text-sm">
                                    <span className="text-gray-500 uppercase text-[10px] tracking-wider mt-1">Start Date</span>
                                    <span className="font-bold text-[#0d141b]">{formatDate(investment.startDate)}</span>
                                </div>
                                <div className="flex justify-between font-sans text-sm">
                                    <span className="text-gray-500 uppercase text-[10px] tracking-wider mt-1">Maturity Date</span>
                                    <span className="font-bold text-[#0d141b]">{formatDate(investment.maturityDate)}</span>
                                </div>
                                <div className="flex justify-between font-sans pt-3 border-t border-dashed border-gray-300 mt-2">
                                    <span className="text-[#d4af37] font-bold uppercase text-sm">Maturity Value</span>
                                    <span className="font-bold text-2xl text-[#d4af37]">{formatCurrency(investment.maturityAmount)}</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-[9px] text-gray-400 font-sans">Authorized by Smart FD AI • Reference #{investment.id?.slice(0,8).toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default InvestmentDetails;