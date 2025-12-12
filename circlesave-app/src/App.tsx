import { useState } from 'react';
import { Home, Bell, User, Search, Settings, ChevronRight, Building2, Car, X, ArrowLeft } from 'lucide-react';

// Types
interface Circle {
  id: string;
  name: string;
  icon: string;
  amount?: number;
  circleCount?: number;
}

interface Contribution {
  date: string;
  name: string;
  amount: number;
}

// Mock Data
const circles: Circle[] = [
  { id: '1', name: 'Contribution', icon: 'building', circleCount: 12 },
  { id: '2', name: 'Contribute', icon: 'car', amount: 1300.00 },
  { id: '3', name: 'Sarah', icon: 'user', amount: 1367.00 },
  { id: '4', name: 'Westert', icon: 'user', amount: 1300.00 },
  { id: '5', name: 'Circles 1', icon: 'group', circleCount: 17, amount: 2.00 },
  { id: '6', name: 'Circles 2', icon: 'group', circleCount: 17, amount: -3.3 },
];

const contributions: Contribution[] = [
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
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white rounded-full"></div>
    </div>
    <span className="text-xl font-semibold text-gray-800">CircleSave</span>
  </div>
);

const Header = ({ activeTab }: { activeTab: string }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Logo />
      <nav className="flex gap-8">
        <button className={`text-sm font-medium ${activeTab === 'home' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}>
          Home
        </button>
        <button className={`text-sm font-medium ${activeTab === 'circles' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}>
          My Circles
        </button>
        <button className={`text-sm font-medium ${activeTab === 'account' ? 'text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-500'}`}>
          Account
        </button>
      </nav>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <User className="w-5 h-5 text-gray-600 cursor-pointer" />
      </div>
    </div>
  </div>
);

const HomePage = () => (
  <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Home</h1>
        <div className="flex gap-4">
          <Home className="w-6 h-6 text-gray-600" />
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Good Morning,</h2>
          <p className="text-xl text-gray-800">Sarah 👋</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-4">
        <p className="text-slate-300 text-sm mb-2">Your contribution</p>
        <h3 className="text-white text-4xl font-bold mb-2">$1,367.00</h3>
        <p className="text-slate-400 text-xs mb-4">Updated 11, May 2024</p>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full" style={{ width: '86%' }}></div>
        </div>
        <p className="text-slate-400 text-xs text-right">86%</p>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6 relative">
        <button className="absolute top-2 right-2 text-gray-400">
          <X className="w-4 h-4" />
        </button>
        <p className="text-sm text-gray-700 mb-3">
          For waste contributions are other food fixie, for hoewesses and get alops to the application.
        </p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
          Contribution
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contribution Flow</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Contribution</p>
                <p className="text-sm text-gray-500">12 Circles</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Contribution</p>
                <p className="text-sm text-gray-500">12 Circles</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-800">Contribution</p>
                <p className="text-sm text-gray-500">12 Circles</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MyCirclesPage = ({ onNavigate }: { onNavigate: (view: string, circleId?: string) => void }) => (
  <div className="max-w-4xl mx-auto bg-white min-h-screen">
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Circles</h1>
        <Settings className="w-6 h-6 text-gray-600 cursor-pointer" />
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search to name your my circles"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contribution Flow</h2>
        <div className="space-y-3">
          {circles.map((circle) => (
            <div
              key={circle.id}
              onClick={() => onNavigate('details', circle.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-green-500 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-semibold">
                  {circle.name.substring(0, 1)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{circle.name}</p>
                  {circle.circleCount && (
                    <p className="text-sm text-gray-500">{circle.circleCount} Circles</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {circle.amount !== undefined && (
                  <span className={`font-semibold ${circle.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
);

const CircleDetailsPage = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-5xl mx-auto bg-gray-50 min-h-screen">
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <button className="text-gray-600 font-medium mr-6">My Circles</button>
            <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-1">
              Circle Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <button className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium mb-4">
              <span className="text-xl">⊙</span>
              All
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <span className="text-sm">≡</span>
              Filters
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-slate-800 text-white rounded-lg">
              <div className="w-8 h-8 bg-white text-slate-800 rounded-full flex items-center justify-center font-semibold text-sm">
                S
              </div>
              <span className="font-medium">Sarah</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                W
              </div>
              <span className="font-medium text-gray-700">Westert</span>
            </div>
          </div>

          <button className="text-green-600 font-medium text-sm hover:text-green-700">
            Add my circles
          </button>
        </div>

        <div className="col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Circler Supply</h2>
                <p className="text-slate-300 text-sm">Last area 11, 2023</p>
              </div>
            </div>

            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-300 text-sm mb-1">Your salary</p>
                <p className="text-3xl font-bold">$293.00</p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm mb-1">Contribution</p>
                <p className="text-3xl font-bold text-green-400">$0</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">$250.00</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="text-slate-400 text-sm">+$200.01</span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contributions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
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
                      <td className="py-4 px-4 text-sm text-gray-700">{contribution.date}</td>
                      <td className="py-4 px-4 text-sm text-gray-700">{contribution.name}</td>
                      <td className={`py-4 px-4 text-sm text-right font-medium ${
                        contribution.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {contribution.amount >= 0 ? '+' : '-'}${Math.abs(contribution.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
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
  const [currentView, setCurrentView] = useState<'home' | 'circles' | 'details'>('home');

  const handleNavigate = (view: string, _circleId?: string) => {
    setCurrentView(view as 'home' | 'circles' | 'details');
  };

  const handleBack = () => {
    setCurrentView('circles');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={currentView === 'details' ? 'circles' : currentView} />
      {currentView === 'home' && <HomePage />}
      {currentView === 'circles' && <MyCirclesPage onNavigate={handleNavigate} />}
      {currentView === 'details' && <CircleDetailsPage onBack={handleBack} />}
    </div>
  );
}