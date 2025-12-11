import { useState } from 'react';
import { User, Bell, Settings, Search, ChevronRight, ChevronLeft } from 'lucide-react';

const CircleSaveApp = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          {/* <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full opacity-50"></div>
          </div> */}
          <span className="text-xl font-semibold text-gray-900">
            <img className='w-28' src="logo.png" alt="" />
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`text-sm font-medium ${currentPage === 'home' ? 'text-gray-900 border-b-2 border-teal-600 pb-5' : 'text-gray-600'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('circles')}
            className={`text-sm font-medium ${currentPage === 'circles' || currentPage === 'wallet' ? 'text-gray-900 border-b-2 border-teal-600 pb-5' : 'text-gray-600'}`}
          >
            My Circles
          </button>
          <button className="text-sm font-medium text-gray-600">
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

  // Home Page
  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Greeting and Contribution */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img className='w-28' src="logo.png" alt="" />
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
                For wisla contributes are either food type, for inxxxxxxss and get USDC via the application.
              </p>
              <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700">
                Contribution
              </button>
            </div>
          </div>

          {/* Contribution Flow List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contribution Flow</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">My Circles</h3>
            <Settings size={20} className="text-gray-600 cursor-pointer" />
          </div>

          <div className="relative mb-6">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search to name your my circles"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Contribution Flow</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
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
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Contribute</p>
                    <p className="text-sm text-gray-500">$1,300.00</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
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

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
                    W
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Westert</p>
                    <p className="text-sm text-gray-500">$1,300.00</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
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

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
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

  // Active Circles Page
  const ActiveCirclesPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Active Circles</h2>
          <Settings size={20} className="text-gray-600 cursor-pointer" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Office Rent Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                  <div className="w-6 h-6 bg-white rounded opacity-50"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Office Rent</h3>
              </div>
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Pot amount</p>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-gray-900">₦50k/week</p>
                <p className="text-sm font-medium text-gray-600">89%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Next Payout: 10 time</p>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">
              View Dashboard
            </button>
          </div>

          {/* Ball Trip Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Ball Trip</h3>
              </div>
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Pot amount</p>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-gray-900">₦50k/week</p>
                <p className="text-sm font-medium text-gray-600">92%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Next Payout: 10 time</p>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">
              View Dashboard
            </button>
          </div>

          {/* Office Rent Card 2 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                  <div className="w-6 h-6 bg-white rounded opacity-50"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Office Rent</h3>
              </div>
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Pot amount</p>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-gray-900">₦50k/week</p>
                <p className="text-sm font-medium text-gray-600">87%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Next Payout: 10 Nov</p>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">
              View Dashboard
            </button>
          </div>

          {/* Circler Supply Card */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </div>
                <h3 className="font-semibold text-gray-900">Circler Supply</h3>
              </div>
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Pot amount</p>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-gray-900">₦50k/week</p>
                <p className="text-sm font-medium text-gray-600">75%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Next Payout: 10 Nov</p>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50">
              View Dashboard
            </button>
          </div>
        </div>

        {/* Past Circles */}
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
                <span className="font-medium text-gray-900">Ball Trip - wH History</span>
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
  );

  // Wallet Page
  const WalletPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - My Circles */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setCurrentPage('circles')}
              className="text-lg font-semibold text-gray-900 border-b-2 border-teal-600 pb-2"
            >
              My Circles
            </button>
            <button className="text-lg font-medium text-gray-600">
              Wallet
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Search size={18} className="text-gray-400" />
              <span className="text-sm text-gray-600">All</span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-300"></div>
                </div>
                <span className="text-sm text-gray-700">Filters</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
              <span className="text-gray-900 font-medium">Sarah</span>
            </div>
            <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-semibold">
                W
              </div>
              <span className="text-gray-900 font-medium">Westert</span>
            </div>
          </div>

          <button className="mt-6 text-teal-600 text-sm font-medium">
            Add my circles
          </button>
        </div>

        {/* Right Panel - Circle Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 relative">
            <button 
              onClick={() => setCurrentPage('circles')}
              className="absolute top-6 right-6 text-white hover:text-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full opacity-30"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-1">Circler Supply</h2>
            <p className="text-sm text-gray-300 text-center">Last onen 11, 2023</p>
          </div>

          <div className="p-6">
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

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Bil $250.00</span>
                <span className="text-gray-900">+$200.01</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Date</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jan 17, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Sarah</td>
                      <td className="py-3 px-2 text-sm text-green-600 text-right">+$10.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jan 17, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Lohnrium</td>
                      <td className="py-3 px-2 text-sm text-red-600 text-right">-$0.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jan 17, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Sarah</td>
                      <td className="py-3 px-2 text-sm text-green-600 text-right">+$0.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jan 17, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Sarah</td>
                      <td className="py-3 px-2 text-sm text-green-600 text-right">+$0.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jul 08, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Sarah</td>
                      <td className="py-3 px-2 text-sm text-red-600 text-right">-$0.00</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-600">Jul 08, 2023</td>
                      <td className="py-3 px-2 text-sm text-gray-900">Sarah</td>
                      <td className="py-3 px-2 text-sm text-red-600 text-right">-$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700">
              Contribution
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'circles' && <ActiveCirclesPage />}
      {currentPage === 'wallet' && <WalletPage />}
    </div>
  );
};

export default CircleSaveApp;
