import { useState } from 'react';
import { Home as HomeIcon, Users, User } from 'lucide-react';
import Navigation from './Navigation';
import { HomePage } from './Home';
import { ActiveCirclesPage } from './ActiveCircle';
import { WalletPage } from './WalletPage';


const CircleSaveApp = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'active-circles' && <ActiveCirclesPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'wallet' && <WalletPage setCurrentPage={setCurrentPage} />}
      {/* {currentPage === 'circle-details' && <CircleDetailsPage setCurrentPage={setCurrentPage} />} */}
      
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