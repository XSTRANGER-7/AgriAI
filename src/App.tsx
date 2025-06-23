import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CropRecommendation from './components/CropRecommendation';
import MonitoringSystem from './components/MonitoringSystem';
import ChatBot from './components/ChatBot';
import PestIdentification from './components/PestIdentification';
import Reports from './components/Reports';
import Marketplace from './components/Marketplace';
import Footer from './components/Footer';

type ActiveSection = 'home' | 'dashboard' | 'crops' | 'monitoring' | 'chat' | 'pests' | 'reports' | 'marketplace';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'dashboard':
        return <Dashboard />;
      case 'crops':
        return <CropRecommendation />;
      case 'monitoring':
        return <MonitoringSystem />;
      case 'chat':
        return <ChatBot />;
      case 'pests':
        return <PestIdentification />;
      case 'reports':
        return <Reports />;
      case 'marketplace':
        return <Marketplace />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-green-900 font-inter">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="relative z-10">
        {renderSection()}
      </main>
      
      {activeSection === 'home' && <Footer />}
    </div>
  );
}

export default App;