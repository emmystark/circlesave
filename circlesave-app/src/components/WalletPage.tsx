import { Search, ChevronLeft } from 'lucide-react';





export const WalletPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const contributions = [
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
                      {contributions.map((contrib: { date: string; name: string; amount: string; type: string }, idx: number) => (
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
