import React, { useState } from 'react';
import { Home, Bell, User, Search, Settings, ChevronRight, ChevronDown, Building2, Car, X, ArrowLeft, Menu } from 'lucide-react';

// Types
interface Circle {
  id: string;
  name: string;
  icon: string;
  potAmount: number;
  progress: number;
  nextPayout: string;
  status: 'active' | 'past';
}

interface Transaction {
  date: string;
  name: string;
  amount: number;
}

// Mock Data
const activeCircles: Circle[] = [
  { id: '1', name: 'Office Rent', icon: '🏢', potAmount: 50, progress: 89, nextPayout: '10 time', status: 'active' },
  { id: '2', name: 'Ball Trip', icon: '⚽', potAmount: 50, progress: 92, nextPayout: '10 time', status: 'active' },
  { id: '3', name: 'Office Rent', icon: '🏢', potAmount: 50, progress: 87, nextPayout: '10 Nov', status: 'active' },
  { id: '4', name: 'Circler Supply', icon: '⚙️', potAmount: 50, progress: 75, nextPayout: '10 Nov', status: 'active' },
];

const myCircles = [
  { id: '1', name: 'Contribution', icon: '🏛️', circleCount: 12 },
  { id: '2', name: 'Contribute', amount: 1300.00 },
  { id: '3', name: 'Sarah', amount: 1367.00 },
  { id: '4', name: 'Westert', amount: 1300.00 },
  { id: '5', name: 'Circles 1', circleCount: 17, amount: 2.00 },
  { id: '6', name: 'Circles 2', circleCount: 17, amount: -3.3 },
];

const transactions: Transaction[] = [
  { date: 'Jan 17, 2023', name: 'Deposit', amount: -10.00 },
  { date: 'Jan 17, 2023', name: 'Contribution', amount: 0.00 },
  { date: 'Jan 17, 2023', name: 'Contribution', amount: -0.00 },
  { date: 'Jul 08, 2023', name: 'Payout', amount: -0.00 },
];

const contributions = [
  { date: 'Jan 17, 2023', name: 'Sarah', amount: 10.00 },
  { date: 'Jan 17, 2023', name: 'Lonnrum', amount: -0.00 },
  { date: 'Jan 17, 2023', name: 'Sarah', amount: 0.00 },
  { date: 'Jan 17, 2023', name: 'Sarah', amount: 0.00 },
  { date: 'Jul 08, 2023', name: 'Sarah', amount: -0.00 },
  { date: 'Jul 08, 2023', name: 'Sarah', amount: -0.00 },
];

// Components
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white rounded-full"></div>
    </div>
    <span className="text-xl font-semibold text-gray-800">CircleSave</span>
  </div>
);

const Header = ({ activeTab, onTabChange, onMenuToggle }: { activeTab: string; onTabChange: (tab: string) => void; onMenuToggle: () => void }) => (
  <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
        <Logo />
      </div>
      <nav className="hidden lg:flex gap-8">
        <button 
          onClick={() => onTabChange('home')}
          className={`text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Home
        </button>
        <button 
          onClick={() => onTabChange('circles')}
          className={`text-sm font-medium transition-colors ${activeTab === 'circles' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500 hover:text-gray-700'}`}
        >
          My Circles
        </button>
        <button 
          onClick={() => onTabChange('account')}
          className={`text-sm font-medium transition-colors ${activeTab === 'account' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Account
        </button>
      </nav>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
        <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>
    </div>
  </div>
);

const MobileMenu = ({ isOpen, activeTab, onTabChange, onClose }: any) => (
  <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
    <div className={`bg-white w-64 h-full p-6 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
      <div className="mb-8">
        <Logo />
      </div>
      <nav className="flex flex-col gap-4">
        <button 
          onClick={() => { onTabChange('home'); onClose(); }}
          className={`text-left py-2 px-4 rounded-lg ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Home
        </button>
        <button 
          onClick={() => { onTabChange('circles'); onClose(); }}
          className={`text-left py-2 px-4 rounded-lg ${activeTab === 'circles' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          My Circles
        </button>
        <button 
          onClick={() => { onTabChange('account'); onClose(); }}
          className={`text-left py-2 px-4 rounded-lg ${activeTab === 'account' ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
        >
          Account
        </button>
      </nav>
    </div>
  </div>
);

const ActiveCirclesPage = () => {
  const [expandedCircle, setExpandedCircle] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Active Circles</h1>
          <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6 mb-8">
          {activeCircles.map((circle) => (
            <div key={circle.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                    {circle.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{circle.name}</h3>
                </div>
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pot amount</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-gray-900">₦{circle.potAmount}k/week</p>
                    <span className="text-sm font-medium text-gray-600">{circle.progress}%</span>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                    style={{ width: `${circle.progress}%` }}
                  ></div>
                </div>

                <p className="text-sm text-gray-600">Next Payout: {circle.nextPayout}</p>

                <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Dashboard
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Past Circles</h2>
          <div className="space-y-2">
            <button 
              onClick={() => setExpandedCircle(expandedCircle === '1' ? null : '1')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-700">Office Rent - History</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedCircle === '1' ? 'rotate-180' : ''}`} />
            </button>
            {expandedCircle === '1' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Circle history details would appear here...</p>
              </div>
            )}
            
            <button 
              onClick={() => setExpandedCircle(expandedCircle === '2' ? null : '2')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-700">Ball Trip - wH History</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expandedCircle === '2' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onNavigate }: { onNavigate: (view: string) => void }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column - Home */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Home</h1>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Home className="w-5 h-5 text-gray-600" />
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <Bell className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <div className="w-12 h-12 border-3 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Good Morning,</h2>
              <p className="text-xl text-gray-800">Sarah 👋</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-6 mb-4">
            <p className="text-slate-300 text-sm mb-2">Your contribution</p>
            <h3 className="text-white text-4xl lg:text-5xl font-bold mb-2">$1,367.00</h3>
            <p className="text-slate-400 text-sm mb-4">Updated 11, May 2024</p>
            <div className="w-full bg-slate-600 rounded-full h-2.5 mb-2">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full" style={{ width: '86%' }}></div>
            </div>
            <p className="text-slate-300 text-sm text-right">86%</p>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
            <p className="text-sm text-gray-700 mb-4 pr-6">
              For waste contributions are other food fixie, for hoewesses and get alops to the application.
            </p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
              Contribution
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Flow</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {i === 1 && <Building2 className="w-6 h-6 text-gray-600" />}
                      {i === 2 && <Car className="w-6 h-6 text-gray-600" />}
                      {i === 3 && <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Contribution</p>
                      <p className="text-sm text-gray-500">12 Circles</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - My Circles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Circles</h1>
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search to name your my circles"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contribution Flow</h2>
            <div className="space-y-3">
              {myCircles.map((circle) => (
                <div
                  key={circle.id}
                  onClick={() => onNavigate('details')}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold">
                      {circle.name.substring(0, 1)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{circle.name}</p>
                      {circle.circleCount && (
                        <p className="text-sm text-gray-500">{circle.circleCount} Circles</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {circle.amount !== undefined && (
                      <span className={`font-semibold ${circle.amount >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {circle.amount >= 0 ? '+' : ''}${circle.amount.toFixed(2)}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WalletPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left - My Circles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
          <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
            <button className="text-lg font-semibold text-gray-900 border-b-2 border-gray-900 pb-3">
              My Circles
            </button>
            <button className="text-lg font-medium text-gray-500 pb-3 hover:text-gray-700">
              Wallet
            </button>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              <span className="text-xl">⊙</span>
              All
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-lg">≡</span>
              Filters
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 p-4 bg-slate-800 text-white rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center font-semibold">
                S
              </div>
              <span className="font-medium">Sarah</span>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-semibold">
                W
              </div>
              <span className="font-medium text-gray-700">Westert</span>
            </div>
          </div>

          <button className="text-emerald-600 font-medium text-sm hover:text-emerald-700">
            Add my circles
          </button>
        </div>

        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 p-6 lg:p-8 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold">Circler Supply</h2>
                <p className="text-slate-300 text-sm">Last area 11, 2023</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-slate-300 text-sm mb-1">Your salary</p>
                <p className="text-3xl lg:text-4xl font-bold">$293.00</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-slate-300 text-sm mb-1">Contribution</p>
                <p className="text-3xl lg:text-4xl font-bold text-emerald-400">$0</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm whitespace-nowrap">$250.00</span>
              <div className="flex-1">
                <div className="w-full bg-slate-600 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="text-slate-400 text-sm whitespace-nowrap">+$200.01</span>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h3>
            <div className="overflow-x-auto -mx-4 lg:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.map((contribution, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-700 whitespace-nowrap">{contribution.date}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{contribution.name}</td>
                        <td className={`py-4 px-4 text-sm text-right font-medium whitespace-nowrap ${
                          contribution.amount >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          {contribution.amount >= 0 ? '+' : '-'}${Math.abs(contribution.amount).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
              Contribution
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
export default function App() {
  const [currentView, setCurrentView] = useState<'active' | 'home' | 'wallet' | 'details'>('active');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (view: string) => {
    setCurrentView(view as 'active' | 'home' | 'wallet' | 'details');
    setMenuOpen(false);
  };

  const handleBack = () => {
    setCurrentView('wallet');
  };

  const getActiveTab = () => {
    if (currentView === 'active' || currentView === 'wallet' || currentView === 'details') return 'circles';
    return currentView;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={getActiveTab()} 
        onTabChange={(tab) => {
          if (tab === 'circles') setCurrentView('active');
          else if (tab === 'home') setCurrentView('home');
          else setCurrentView('active');
        }}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />
      <MobileMenu 
        isOpen={menuOpen}
        activeTab={getActiveTab()}
        onTabChange={(tab: string) => {
          if (tab === 'circles') setCurrentView('active');
          else if (tab === 'home') setCurrentView('home');
          else setCurrentView('active');
        }}
        onClose={() => setMenuOpen(false)}
      />
      {currentView === 'active' && <ActiveCirclesPage />}
      {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentView === 'wallet' && <WalletPage />}
      {currentView === 'details' && <CircleDetailsPage onBack={handleBack} />}
    </div>
  );
}ert</span>
            </div>
          </div>

          <button className="mt-6 text-emerald-600 font-medium text-sm hover:text-emerald-700">
            Add my circles
          </button>
        </div>

        {/* Right - Wallet */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 lg:p-8">
            <p className="text-blue-100 text-sm mb-2">Total Balance</p>
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-1">₦ 125,000.00</h2>
            <p className="text-blue-100 text-sm">≈ $ 85.00 USDC</p>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-white text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Add Funds
              </button>
              <button className="flex-1 bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Withdraw
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assets</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    $
                  </div>
                  <span className="font-medium text-gray-900">USDC</span>
                </div>
                <span className="font-semibold text-gray-900">₦ 125,000.00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    ₦
                  </div>
                  <span className="font-medium text-gray-900">NGN</span>
                </div>
                <span className="font-semibold text-gray-900">₦ 0.00</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Name</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-2 text-sm text-gray-700">{transaction.date}</td>
                      <td className="py-4 px-2 text-sm text-gray-700">{transaction.name}</td>
                      <td className={`py-4 px-2 text-sm text-right font-medium ${
                        transaction.amount >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// const CircleDetailsPage = ({ onBack }: { onBack: () => void }) => (
//   <div className="min-h-screen bg-gray-50">
//     <div className="max-w-7xl mx-auto p-4 lg:p-8">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4 lg:p-6">
//         <div className="flex items-center gap-4">
//           <button onClick={onBack} className="text-gray-600 hover:text-gray-800 lg:hidden">
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <div className="flex items-center gap-6">
//             <button 
//               onClick={onBack}
//               className="hidden lg:block text-gray-600 hover:text-gray-800"
//             >
//               <ArrowLeft className="w-6 h-6" />
//             </button>
//             <button className="text-gray-600 font-medium hover:text-gray-800">
//               My Circles
//             </button>
//             <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-1">
//               Circle Details
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
//           <div className="space-y-4 mb-6">
//             <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">
//               <span className="text-xl">⊙</span>
//               All
//             </button>
//             <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
//               <span className="text-lg">≡</span>
//               Filters
//             </button>
//           </div>

//           <div className="space-y-3 mb-6">
//             <div className="flex items-center gap-3 p-4 bg-slate-800 text-white rounded-lg cursor-pointer">
//               <div className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center font-semibold">
//                 S
//               </div>
//               <span className="font-medium">Sarah</span>
//             </div>
//             <div className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
//               <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-semibold">
//                 W
//               </div>
//               <span className="font-medium text-gray-700">West