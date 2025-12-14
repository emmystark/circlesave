import { useState } from 'react';
import { Home as HomeIcon, Users, User } from 'lucide-react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';



// ==================== MAIN APP COMPONENT ====================
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