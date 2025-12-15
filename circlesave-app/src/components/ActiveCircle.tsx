import { Settings, ChevronRight } from 'lucide-react';





export const ActiveCirclesPage = ({ setCurrentPage: _ }: { setCurrentPage: (page: string) => void }) => {
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
