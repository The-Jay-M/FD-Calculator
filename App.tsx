import React, { useState, useEffect } from 'react';
import { SavedInvestment, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Assets from './components/Assets';
import Settings from './components/Settings';
import Navigation, { Tab } from './components/Navigation';
import SplashScreen from './components/SplashScreen';
import InvestmentDetails from './components/InvestmentDetails';

const App: React.FC = () => {
  // Application State
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | null>(null);
  
  // Data State
  const [savedInvestments, setSavedInvestments] = useState<SavedInvestment[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', address: '' });

  useEffect(() => {
    const saved = localStorage.getItem('smart_fd_investments');
    const profile = localStorage.getItem('smart_fd_profile');
    if (saved) {
      try {
        setSavedInvestments(JSON.parse(saved));
      } catch (e) { console.error(e); }
    }
    if (profile) {
      try {
        setUserProfile(JSON.parse(profile));
      } catch (e) { console.error(e); }
    }
  }, []);

  const saveToStorage = (inv: SavedInvestment[]) => {
    localStorage.setItem('smart_fd_investments', JSON.stringify(inv));
    setSavedInvestments(inv);
  };

  const saveProfile = (profile: UserProfile) => {
    localStorage.setItem('smart_fd_profile', JSON.stringify(profile));
    setUserProfile(profile);
  }

  const handleSaveInvestment = (inv: SavedInvestment) => {
    const updated = [inv, ...savedInvestments];
    saveToStorage(updated);
    setShowCalculator(false);
    setActiveTab('assets'); // Switch to assets view to see new item
  };
  
  const handleDelete = (id: string) => {
     if(confirm("Permanently delete this investment record?")) {
        const updated = savedInvestments.filter(i => i.id !== id);
        saveToStorage(updated);
        setSelectedInvestmentId(null);
     }
  };

  const handleResetData = () => {
      if(confirm('Are you sure you want to delete all data? This cannot be undone.')) {
          saveToStorage([]);
          localStorage.removeItem('smart_fd_profile');
          setUserProfile({ name: '', address: '' });
          setActiveTab('home');
      }
  };

  // Logic to handle 3D scale down effect on main content when overlay is active
  const isOverlayActive = showCalculator || selectedInvestmentId !== null;

  if (loading) {
      return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  const activeInvestment = savedInvestments.find(i => i.id === selectedInvestmentId);

  return (
    <div className="bg-black min-h-screen text-white font-display relative overflow-hidden">
      
      {/* Main Content Area with Scale Animation */}
      <main 
        className={`h-full bg-background-dark min-h-screen transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOverlayActive ? 'scale-[0.92] opacity-50 rounded-2xl overflow-hidden' : 'scale-100 opacity-100'}`}
        style={{ transformOrigin: 'center center' }}
      >
         {activeTab === 'home' && <Dashboard investments={savedInvestments} onInitiateDeposit={() => setShowCalculator(true)} />}
         {activeTab === 'assets' && <Assets investments={savedInvestments} onViewDetails={setSelectedInvestmentId} onAddNew={() => setShowCalculator(true)} />}
         {activeTab === 'settings' && <Settings onResetData={handleResetData} userProfile={userProfile} onUpdateProfile={saveProfile} />}
         
         {/* Bottom Navigation */}
         <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </main>

      {/* Calculator Overlay - Slide Up */}
      <div 
        className={`fixed inset-0 z-50 bg-background-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showCalculator ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {showCalculator && (
            <Calculator 
                onBack={() => setShowCalculator(false)}
                onSave={handleSaveInvestment}
            />
        )}
      </div>

      {/* Investment Details / Certificate Overlay - Slide Up */}
      <div 
        className={`fixed inset-0 z-[60] bg-background-dark transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ios-sheet ${activeInvestment ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {activeInvestment && (
            <InvestmentDetails 
                investment={activeInvestment}
                userProfile={userProfile}
                onClose={() => setSelectedInvestmentId(null)}
                onDelete={handleDelete}
            />
        )}
      </div>

    </div>
  );
};

export default App;