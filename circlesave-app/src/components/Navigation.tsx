import { Bell, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
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
}