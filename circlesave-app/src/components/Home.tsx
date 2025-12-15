import { Bell, Settings, ChevronRight, X, Search } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export const HomePage = ({ setCurrentPage: _ }: HomePageProps) => (

    // <Navigation currentPage="home" setCurrentPage={setCurrentPage} />,
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