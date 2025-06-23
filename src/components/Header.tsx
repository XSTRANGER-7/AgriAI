import React from 'react';
import { Menu, X, Leaf, BarChart3, Sprout, Monitor, MessageCircle, Bug, FileText, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: any) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'crops', label: 'Crop Advisor', icon: Sprout },
    { id: 'monitoring', label: 'IoT Monitor', icon: Monitor },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'pests', label: 'Pest ID', icon: Bug },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
  ];

  return (
    <header className="relative z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Leaf className="h-8 w-8 text-primary-400 mr-2" />
            <span className="text-xl font-bold text-white">AgriAI</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary-500/20 text-primary-300 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-white/20">
          <div className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-primary-500/20 text-primary-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;