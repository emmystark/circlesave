import React, { useState } from 'react';
import { Home as HomeIcon, Users, User, Bell, Settings, Search, ChevronRight, ChevronLeft, X } from 'lucide-react';

// ==================== NAVIGATION COMPONENT ====================
const Navigation = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center relative">
          <div className="w-5 h-5 border-2 border-white rounded-full absolute"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span className="text-xl font-semibold text-gray-900">CircleSave</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => setCurrentPage('home')}
          className={`text-sm font-medium pb-5 transition-colors ${
            currentPage === 'home' 
              ? 'text-gray-900 border-b-2 border-teal-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('active-circles')}
          className={`text-sm font-medium pb-5 transition-colors ${
            currentPage === 'active-circles' || currentPage === 'wallet' || currentPage === 'circle-details'
              ? 'text-gray-900 border-b-2 border-teal-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Circles
        </button>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 pb-5">
          Account
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <User size={20} />
        </button>
      </div>
    </div>
  </nav>
);

// ==================== HOME PAGE ====================
const HomePage = ({ setCurrentPage }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel */}
      <div className="space-y-6">
        {/* Greeting Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Home</h2>
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-900">
                <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center relative">
              <div className="w-10 h-10 border-4 border-white/30 rounded-full absolute"></div>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Good Morning,</h2>
              <p className="text-2xl text-gray-900">Sarah 👋</p>
            </div>
          </div>

          {/* Contribution Card */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 text-white mb-4">
            <p className="text-sm text-gray-300 mb-2">Your contribution</p>
            <h3 className="text-3xl font-bold mb-1">$1,367.00</h3>
            <p className="text-xs text-gray-400 mb-4">Dec/Jan 11, 2023</p>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">Progress</span>
                <span>46%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full transition-all" style={{ width: '46%' }}></div>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={18} />
            </button>
            <p className="text-sm text-gray-700 mb-3 pr-4">
              For wisla contributes are either food type, for inxxxxxxss and get USDC via the application.
            </p>
            <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors">
              Contribution
            </button>
          </div>
        </div>

        {/* Contribution Flow */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Flow</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
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

      {/* Right Panel - My Circles */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">My Circles</h3>
          <button className="text-gray-600 hover:text-gray-900">
            <Settings size={20} />
          </button>
        </div>

        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search to name your my circles"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Contribution Flow</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
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

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Contribute</p>
                  <p className="text-sm text-gray-500">$1,300.00</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  S
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah</p>
                  <p className="text-sm text-gray-500">Dec circles</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">$1,367.00</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  W
                </div>
                <div>
                  <p className="font-medium text-gray-900">Westert</p>
                  <p className="text-sm text-gray-500">$1,300.00</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  DC
                </div>
                <div>
                  <p className="font-medium text-gray-900">Circles 1</p>
                  <p className="text-sm text-gray-500">17 Circles</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-teal-600">+$2.00</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  DC
                </div>
                <div>
                  <p className="font-medium text-gray-900">Circles 2</p>
                  <p className="text-sm text-gray-500">17 Circles</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">-$3.3</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ==================== ACTIVE CIRCLES PAGE ====================
const ActiveCirclesPage = ({ setCurrentPage }) => {
  const circles = [
    { id: 1, name: 'Office Rent', icon: 'building', amount: '₦50k/week', progress: 89, nextPayout: '10 time', color: 'teal' },
    { id: 2, name: 'Ball Trip', icon: 'puzzle', amount: '₦50k/week', progress: 92, nextPayout: '10 time', color: 'blue' },
    { id: 3, name: 'Office Rent', icon: 'building', amount: '₦50k/week', progress: 87, nextPayout: '10 Nov', color: 'teal' },
    { id: 4, name: 'Circler Supply', icon: 'puzzle', amount: '₦50k/week', progress: 75, nextPayout: '10 Nov', color: 'blue' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Active Circles</h2>
          <button className="text-gray-600 hover:text-gray-900">
            <Settings size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {circles.map((circle) => (
            <div key={circle.id} className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${circle.color === 'teal' ? 'bg-teal-600' : 'bg-slate-700'} rounded-lg flex items-center justify-center`}>
                    {circle.icon === 'building' ? (
                      <div className="w-6 h-6 bg-white/50 rounded"></div>
                    ) : (
                      <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
                        <div className="bg-white/50 rounded-sm"></div>
                        <div className="bg-white/50 rounded-sm"></div>
                        <div className="bg-white/50 rounded-sm"></div>
                        <div className="bg-white/50 rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{circle.name}</h3>
                </div>
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
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
                    className={`${circle.color === 'teal' ? 'bg-teal-600' : 'bg-blue-600'} h-2 rounded-full transition-all`} 
                    style={{ width: `${circle.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">Next Payout: {circle.nextPayout}</p>
              <button className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Dashboard
              </button>
            </div>
          ))}
        </div>

        {/* Past Circles */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Circles</h3>
          <div className="space-y-3">
            <details className="border border-gray-200 rounded-lg group">
              <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">Office Rent - History</span>
                <ChevronRight size={20} className="text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">Completed on Oct 15, 2023</p>
                <p className="text-sm text-gray-600 mt-1">Total saved: ₦200,000</p>
              </div>
            </details>
            
            <details className="border border-gray-200 rounded-lg group">
              <summary className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900">Ball Trip - wH History</span>
                <ChevronRight size={20} className="text-gray-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">Completed on Sep 20, 2023</p>
                <p className="text-sm text-gray-600 mt-1">Total saved: ₦150,000</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== WALLET PAGE ====================
const WalletPage = ({ setCurrentPage }) => {
  const transactions = [
    { date: 'Jan 17, 2023', name: 'Deposit', amount: '-$10.00', type: 'negative' },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '+$0.00', type: 'positive' },
    { date: 'Jan 17, 2023', name: 'Contribution', amount: '-$0.00', type: 'negative' },
    { date: 'Jul 08, 2023', name: 'Payout', amount: '-$0.00', type: 'negative' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - My Circles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-6 border-b">
            <button
              onClick={() => setCurrentPage('active-circles')}
              className="text-lg font-semibold text-gray-900 border-b-2 border-teal-600 pb-3 -mb-px"
            >
              My Circles
            </button>
            <button className="text-lg font-medium text-gray-600 pb-3">
              Wallet
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3 p-3 bg-gray-50 rounded-lg">
              <Search size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600">All</span>
            </div>
            <div className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-medium">Filters</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                S
              </div>
              <span className="text-gray-900 font-medium">Sarah</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                W
              </div>
              <span className="text-gray-900 font-medium">Westert</span>
            </div>
          </div>

          <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
            Add my circles
          </button>
        </div>

        {/* Right Panel - Circle Details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 relative">
            <button 
              onClick={() => setCurrentPage('active-circles')}
              className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center relative">
                <div className="w-8 h-8 border-2 border-white/30 rounded-full absolute"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1">Circler Supply</h2>
            <p className="text-sm text-gray-300 text-center">Last onen 11, 2023</p>
          </div>

          <div className="p-6">
            {/* Salary and Contribution */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Your salary</p>
                <p className="text-2xl font-bold text-gray-900">$293.00</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Contribution</p>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Bil $250.00</span>
                <span className="text-gray-900">+$200.01</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-600 h-2.5 rounded-full transition-all" style={{ width: '80%' }}></div>
              </div>
            </div>

            {/* Contributions Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h3>
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-6 sm:px-0">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Date</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Name</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributions.map((contrib, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-2 text-sm text-gray-600 whitespace-nowrap">{contrib.date}</td>
                          <td className="py-3 px-2 text-sm text-gray-900 whitespace-nowrap">{contrib.name}</td>
                          <td className={`py-3 px-2 text-sm text-right whitespace-nowrap ${
                            contrib.type === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {contrib.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
              Contribution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP COMPONENT ====================
const CircleSaveApp = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'active-circles' && <ActiveCirclesPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'wallet' && <WalletPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'circle-details' && <CircleDetailsPage setCurrentPage={setCurrentPage} />}
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center space-y-1 ${
              currentPage === 'home' ? 'text-teal-600' : 'text-gray-600'
            }`}
          >
            <HomeIcon size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => setCurrentPage('active-circles')}
            className={`flex flex-col items-center space-y-1 ${
              currentPage === 'active-circles' || currentPage === 'wallet' || currentPage === 'circle-details'
                ? 'text-teal-600' 
                : 'text-gray-600'
            }`}
          >
            <Users size={24} />
            <span className="text-xs font-medium">Circles</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-600">
            <User size={24} />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircleSaveApp;
//               <Search size={18} className="text-gray-400" />
//               <span className="text-sm text-gray-600">All</span>
//             </div>
//             <div className="flex items-center space-x-2 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
//               <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded">
//                 <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
//                 </svg>
//               </div>
//               <span className="text-sm text-gray-700 font-medium">Filters</span>
//             </div>
//           </div>

//           <div className="space-y-3 mb-6">
//             <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
//               <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                 S
//               </div>
//               <span className="text-gray-900 font-medium">Sarah</span>
//             </div>
//             <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
//               <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
//                 W
//               </div>
//               <span className="text-gray-900 font-medium">Westert</span>
//             </div>
//           </div>

//           <button className="text-teal-600 text-sm font-medium hover:text-teal-700">
//             Add my circles
//           </button>
//         </div>

//         {/* Right Panel - Wallet Details */}
//         <div className="space-y-6">
//           {/* Balance Card */}
//           <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white">
//             <p className="text-sm text-blue-100 mb-2">Total Balance</p>
//             <h2 className="text-3xl sm:text-4xl font-bold mb-1">₦ 125,000.00</h2>
//             <p className="text-sm text-blue-100 mb-6">≈ $ 85.00 USDC</p>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button className="flex-1 bg-white text-blue-600 py-2.5 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                 Add Funds
//               </button>
//               <button className="flex-1 border-2 border-white text-white py-2.5 px-4 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
//                 Withdraw
//               </button>
//             </div>
//           </div>

//           {/* Your Assets */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assets</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                     U
//                   </div>
//                   <span className="font-medium text-gray-900">USDC</span>
//                 </div>
//                 <span className="font-semibold text-gray-900">₦ 125,000.00</span>
//               </div>
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                     N
//                   </div>
//                   <span className="font-medium text-gray-900">NGN</span>
//                 </div>
//                 <span className="font-semibold text-gray-900">₦ 0.00</span>
//               </div>
//             </div>
//           </div>

//           {/* Transaction History */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
//             <div className="overflow-x-auto -mx-6 sm:mx-0">
//               <div className="inline-block min-w-full align-middle px-6 sm:px-0">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Date</th>
//                       <th className="text-left py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Name</th>
//                       <th className="text-right py-3 px-2 text-sm font-medium text-gray-700 whitespace-nowrap">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {transactions.map((tx, idx) => (
//                       <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                         <td className="py-3 px-2 text-sm text-gray-600 whitespace-nowrap">{tx.date}</td>
//                         <td className="py-3 px-2 text-sm text-gray-900 whitespace-nowrap">{tx.name}</td>
//                         <td className={`py-3 px-2 text-sm text-right whitespace-nowrap ${
//                           tx.type === 'positive' ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {tx.amount}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== CIRCLE DETAILS PAGE ====================
// const CircleDetailsPage = ({ setCurrentPage }) => {
//   const contributions = [
//     { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$10.00', type: 'positive' },
//     { date: 'Jan 17, 2023', name: 'Lohnrium', amount: '-$0.00', type: 'negative' },
//     { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$0.00', type: 'positive' },
//     { date: 'Jan 17, 2023', name: 'Sarah', amount: '+$0.00', type: 'positive' },
//     { date: 'Jul 08, 2023', name: 'Sarah', amount: '-$0.00', type: 'negative' },
//     { date: 'Jul 08, 2023', name: 'Sarah', amount: '-$0.00', type: 'negative' }
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Panel - My Circles */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex items-center space-x-4 mb-6 border-b">
//             <button
//               onClick={() => setCurrentPage('active-circles')}
//               className="text-lg font-semibold text-gray-900 border-b-2 border-teal-600 pb-3 -mb-px"
//             >
//               My Circles
//             </button>
//             <button className="text-lg font-medium text-gray-600 pb-3">
//               Circle Details
//             </button>
//           </div>

//           <div className="mb-6">
//             <div className="flex items-center space-x-2 mb-3 p-3 bg-gray-50 rounde