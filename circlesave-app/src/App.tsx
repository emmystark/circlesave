import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { User, Bell, Settings, Search, SlidersHorizontal, ChevronRight, ChevronLeft, Lock, Users, Globe, Building2, Handshake, Check } from 'lucide-react';

// Simple Router Implementation
const Router = ({ children }: { children: ReactNode }) => {
  const [currentPath, setCurrentPath] = useState('/');
  
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

type RouterContextType = { currentPath: string; navigate: (path: string) => void };
const RouterContext = React.createContext<RouterContextType | undefined>(undefined);

const Route = ({ path, element }: { path: string; element: ReactNode }) => {
  const context = React.useContext(RouterContext);
  if (!context) return null;
  const { currentPath } = context;
  return currentPath === path ? element : null;
};

const useNavigate = () => {
  const context = React.useContext(RouterContext);
  if (!context) throw new Error('useNavigate must be used within Router');
  return context.navigate;
};

const useLocation = () => {
  const context = React.useContext(RouterContext);
  if (!context) throw new Error('useLocation must be used within Router');
  return { pathname: context.currentPath };
};

// Navigation Component
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (paths: string[]) => paths.includes(location.pathname);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          {/* <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
          </div> */}
          <img src="../assets/logo.png" className='w-32' alt="" />
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/home')}
            className={`text-sm font-medium ${isActive(['/home']) ? 'text-gray-900 border-b-2 border-teal-600 pb-5' : 'text-gray-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/circles')}
            className={`text-sm font-medium ${isActive(['/circles', '/circle-details', '/wallet']) ? 'text-gray-900 border-b-2 border-teal-600 pb-5' : 'text-gray-600'}`}
          >
            My Circles
          </button>
          <button 
            onClick={() => navigate('/account')}
            className={`text-sm font-medium ${isActive(['/account']) ? 'text-gray-900 border-b-2 border-teal-600 pb-5' : 'text-gray-600'}`}
          >
            Account
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600">
            <Bell size={20} />
          </button>
          <button className="text-gray-600">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Select Circle Type Page
const SelectCircleTypePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-12">Select Your Circle Type</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <div className="relative">
                <Lock className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                {/* <Users className="w-10 h-10 text-teal-600 absolute -bottom-2 -right-2" strokeWidth={1.5} /> */}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Private Circle</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              For friends & family.<br />Invite-only. Trusted<br />group savings.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="w-full py-2.5 px-4 border-2 border-gray-800 text-gray-800 rounded-md font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Select Private
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <div className="relative">
                <Globe className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                {/* <Users className="w-10 h-10 text-teal-600 absolute -bottom-2 -right-2" strokeWidth={1.5} /> */}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Public Circle</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Open to everyone.<br />Join existing communities.<br />Vetted by platform.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="w-full py-2.5 px-4 border-2 border-gray-800 text-gray-800 rounded-md font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Select Public
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center">
              <div className="relative">
                <Building2 className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                {/* <Handshake className="w-10 h-10 text-blue-600 absolute -bottom-2 -right-2" strokeWidth={1.5} /> */}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Enterprise Circle</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              For businesses &<br />organizations. Managed<br />payroll & large groups.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="w-full py-2.5 px-4 border-2 border-gray-800 text-gray-800 rounded-md font-medium hover:bg-gray-800 hover:text-white transition-colors"
            >
              Select Enterprise
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Home Page
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Good Morning,</h2>
                  <p className="text-2xl text-gray-900">Sarah 👋</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg p-6 text-white">
                <p className="text-sm text-gray-300 mb-2">Your contribution</p>
                <h3 className="text-3xl font-bold mb-1">$1,367.00</h3>
                <p className="text-xs text-gray-400 mb-4">Dec/Jan 11, 2023</p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Progress</span>
                    <span>46%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '46%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
                <button className="absolute top-2 right-2 text-gray-400">×</button>
                <p className="text-sm text-gray-700 mb-3">
                  Fill white contributions are other food items. For homeless and get USDC via the application.
                </p>
                <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700">
                  Contribution
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Flow</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    onClick={() => navigate('/circle-details')}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Contribution</p>
                        <p className="text-sm text-gray-500">12 Circles</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">My Circles</h3>
              <Settings size={20} className="text-gray-600 cursor-pointer" />
            </div>

            <div className="relative mb-6">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search my circles"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Contribution Flow</h4>
                <button 
                  onClick={() => navigate('/circles')}
                  className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {['Contribution', 'Contribute', 'Sarah', 'Westert', 'Circles 1', 'Circles 2'].map((name, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigate('/circle-details')}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{idx < 2 ? '12 Circles' : '$1,300.00'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {idx > 3 && (
                        <span className={`text-sm font-medium ${idx === 4 ? 'text-green-600' : 'text-red-600'}`}>
                          {idx === 4 ? '+$2.00' : '-$3.3'}
                        </span>
                      )}
                      <ChevronRight size={20} className="text-gray-400" />
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
};

// Active Circles Page
const ActiveCirclesPage = () => {
  const navigate = useNavigate();

  const circles = [
    { name: 'Office Rent', icon: 'building', amount: '₦50k/week', progress: 89, payout: '10 time', color: 'teal' },
    { name: 'Bali Trip', icon: 'users', amount: '₦50k/week', progress: 92, payout: '10 time', color: 'blue' },
    { name: 'Office Rent', icon: 'building', amount: '₦50k/week', progress: 87, payout: '10 Nov', color: 'teal' },
    { name: 'Circler Supply', icon: 'users', amount: '₦50k/week', progress: 75, payout: '10 Nov', color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Active Circles</h2>
            <Settings size={20} className="text-gray-600 cursor-pointer" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {circles.map((circle, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${circle.color === 'teal' ? 'bg-teal-600' : 'bg-blue-600'} rounded-lg flex items-center justify-center text-white`}>
                      {circle.icon === 'building' ? <Building2 size={20} /> : <Users size={20} />}
                    </div>
                    <h3 className="font-semibold text-gray-900">{circle.name}</h3>
                  </div>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" strokeWidth={3} />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Pot amount</p>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xl font-bold text-gray-900">{circle.amount}</p>
                    <p className="text-sm font-medium text-gray-600">{circle.progress}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${circle.color === 'teal' ? 'bg-teal-600' : 'bg-blue-600'} h-2 rounded-full`}
                      style={{ width: `${circle.progress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Next Payout: {circle.payout}</p>
                <button 
                  onClick={() => navigate('/circle-details')}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50"
                >
                  View Dashboard
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Circles</h3>
            <div className="space-y-2">
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium text-gray-900">Office Rent - History</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </summary>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-600">Past circle details would appear here...</p>
                </div>
              </details>
              <details className="border border-gray-200 rounded-lg">
                <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium text-gray-900">Bali Trip - History</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </summary>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-600">Past circle details would appear here...</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Circle Details Page
const CircleDetailsPage = () => {
  const navigate = useNavigate();

  const contributions = [
    { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$10.00', positive: true },
    { date: 'Jan 17, 2023', name: 'Lonmrum', amount: '-$0.00', positive: false },
    { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$0.00', positive: true },
    { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$0.00', positive: true },
    { date: 'Jul 08, 2023', name: 'Sarah', amount: '-$0.00', positive: false },
    { date: 'Jul 08, 2023', name: 'Sarah', amount: '+$0.00', positive: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Circle Details</h1>
          <button 
            onClick={() => navigate('/circles')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-8 mb-6 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Circler Supply</h2>
              <p className="text-sm text-gray-400">Last engo 31, 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Your salary</p>
              <p className="text-3xl font-bold">$293.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Contribution</p>
              <p className="text-3xl font-bold">$0</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Bill $250.00</span>
            <span className="text-green-400">+$200.01</span>
          </div>

          <div className="w-full bg-slate-600 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contributions</h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-600">{item.date}</td>
                    <td className="py-3 px-2 text-sm text-gray-800">{item.name}</td>
                    <td className={`py-3 px-2 text-sm text-right font-medium ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
            Contribution
          </button>
        </div>
      </div>
    </div>
  );
};

// Wallet Page
const WalletPage = () => {

  const transactions = [
    { date: 'Jan 17, 2023', name: 'Deposit', amount: '+$10.00', positive: true },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '+$0.00', positive: true },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '-$0.00', positive: false },
    { date: 'Jul 08, 2023', name: 'Payout', amount: '-$0.00', positive: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 mb-6 text-white">
          <p className="text-sm mb-2 opacity-90">Total Balance</p>
          <h2 className="text-4xl font-bold mb-1">₦ 125,000.00</h2>
          <p className="text-sm opacity-75 mb-6">≈ $ 85.00 USDC</p>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-blue-600 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
              Add Funds
            </button>
            <button className="flex-1 bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-800 transition-colors border border-blue-500">
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Assets</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⊚</span>
                </div>
                <span className="font-semibold text-gray-800">USDC</span>
              </div>
              <span className="font-semibold text-gray-800">₦ 125,000.00</span>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-semibold text-gray-800">NGN</span>
              </div>
              <span className="font-semibold text-gray-800">₦ 0.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
          
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
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-600">{txn.date}</td>
                    <td className="py-3 px-2 text-sm text-gray-800">{txn.name}</td>
                    <td className={`py-3 px-2 text-sm text-right font-medium ${txn.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Page (placeholder)
const AccountPage = () => {



   const transactions = [
    { date: 'Jan 17, 2023', name: 'Deposit', amount: '+$10.00', type: 'positive' },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '+$0.00', type: 'positive' },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '-$0.00', type: 'negative' },
    { date: 'Jul 08, 2023', name: 'Payout', amount: '-$0.00', type: 'negative' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}

            {/* <Navigation /> */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 absolute">
        <div className="flex items-center gap-2 mb-8">
          {/* <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
          </div> */}
          <span className="text-xl font-semibold text-gray-800">CircleSave</span>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Circles</h2>
          
          <div className="space-y-1 mb-4">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Search className="w-4 h-4" />
              <span className="text-sm">All</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                S
              </div>
              <span className="text-sm font-medium text-gray-800">Sarah</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                W
              </div>
              <span className="text-sm font-medium text-gray-800">Westert</span>
            </div>
          </div>

          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            Add my circles
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
             <Navigation />

        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
            </div>

            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 mb-6 text-white">
              <p className="text-sm mb-2 opacity-90">Total Balance</p>
              <h2 className="text-4xl font-bold mb-1">₦ 125,000.00</h2>
              <p className="text-sm opacity-75 mb-6">≈ $ 85.00 USDC</p>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-blue-600 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Add Funds
                </button>
                <button className="flex-1 bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-800 transition-colors border border-blue-500">
                  Withdraw
                </button>
              </div>
            </div>

            {/* Your Assets */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Assets</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⊚</span>
                    </div>
                    <span className="font-semibold text-gray-800">USDC</span>
                  </div>
                  <span className="font-semibold text-gray-800">₦ 125,000.00</span>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <span className="font-semibold text-gray-800">NGN</span>
                  </div>
                  <span className="font-semibold text-gray-800">₦ 0.00</span>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
              
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
                        <td className="py-3 px-2 text-sm text-gray-600">{transaction.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-800">{transaction.name}</td>
                        <td className={`py-3 px-2 text-sm text-right font-medium ${
                          transaction.type === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Main App Component
const CircleSaveApp = () => {
  return (
    <Router>
      <Route path="/" element={<SelectCircleTypePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/circles" element={<ActiveCirclesPage />} />
      <Route path="/circle-details" element={<CircleDetailsPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Router>
  );
};

export default CircleSaveApp;