import { SignInButton } from '@clerk/clerk-react';

export const SignInPage = () => {
  return (
   <div className="min-h-screen flex flex-col">
     <div className="h-screen w-100 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center ">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Logo and Branding */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center relative">
                <div className="w-10 h-10 border-3 border-white rounded-full absolute"></div>
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">CircleSave</h1>
            <p className="text-gray-600 text-lg">Save together, grow together</p>
          </div>

          {/* Features List */}
          <div className="space-y-4 ">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Create Savings Circles</p>
                <p className="text-sm text-gray-600">Start or join circles with friends</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 relative right-5">Smart Contributions</p>
                <p className="text-sm text-gray-600">Set flexible contribution schedules</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 relative right-8">Secure Payouts</p>
                <p className="text-sm text-gray-600">Get USDC directly to your wallet</p>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <SignInButton mode="modal">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                Sign In
              </button>
            </SignInButton>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-600">
            <p>Join thousands saving together</p>
            <p className="mt-2 text-xs text-gray-500">Secure • Fast • Simple</p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-white">
          <p className="text-sm opacity-90">Your personal savings solution powered by <a href='.'>CircleSave</a></p>
        </div>
      </div>
    </div>
   </div>
  );
};
