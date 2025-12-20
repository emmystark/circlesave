import { useEffect, useMemo, useState } from 'react'
import {
  Home,
  LogIn,
  LogOut,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  UserPlus,
  Wallet,
  Users,
} from 'lucide-react'
import logo from './assets/logo.png'
import { createCircle as createCircleOnChain } from './utils/circleFunctions'

type Circle = {
  id: number
  name: string
  onChainId?: string | null
  startCycle: string
  endCycle: string
  totalBalance: string
  contributorCount: number
  creator: {
    id: number
    username: string
    name: string | null
  }
  status: number
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const TOKEN_KEY = 'circlesave-token'
const WALLET_KEY = 'circlesave-wallet'
const MODULE_ADDRESS = import.meta.env.VITE_MODULE_ADDRESS;

function App() {
  console.log('MODULE_ADDRESS:', MODULE_ADDRESS);
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  const [circles, setCircles] = useState<Circle[]>([])
  const [circlesLoading, setCirclesLoading] = useState(false)
  const [circlesError, setCirclesError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'home' | 'circles' | 'settings'>('home')
  const [walletStatus, setWalletStatus] = useState<string | null>(null)
  const [walletLoading, setWalletLoading] = useState(false)
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [circleName, setCircleName] = useState('')
  const [circleDuration, setCircleDuration] = useState<number>(30)
  const [createStatus, setCreateStatus] = useState<string | null>(null)
  const [createLoading, setCreateLoading] = useState(false)
  const [userProfileLoaded, setUserProfileLoaded] = useState(false)

  // Grab token from query string (Google callback) or localStorage
  useEffect(() => {
    const url = new URL(window.location.href)
    const tokenFromUrl = url.searchParams.get('token')
    const stored = localStorage.getItem(TOKEN_KEY)
    const storedWallet = localStorage.getItem(WALLET_KEY)

    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      localStorage.setItem(TOKEN_KEY, tokenFromUrl)
      url.searchParams.delete('token')
      window.history.replaceState({}, '', url.toString())
    } else if (stored) {
      setToken(stored)
    }
    if (storedWallet) {
      setConnectedAddress(storedWallet)
    }
  }, [])

  // Load profile (wallet) from backend when token available
  useEffect(() => {
    async function loadProfile() {
      if (!token) return
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          headers: { Authorization: token },
        })
        if (res.ok) {
          const body = await res.json().catch(() => ({}))
          if (body?.user?.walletAddress) {
            setConnectedAddress(body.user.walletAddress)
          localStorage.setItem(WALLET_KEY, body.user.walletAddress)
          }
        } else if (res.status === 401) {
          localStorage.removeItem(TOKEN_KEY)
          setToken(null)
        }
      } catch {
        // ignore profile load errors
      } finally {
        setUserProfileLoaded(true)
      }
    }
    loadProfile()
  }, [token])

  // Fetch circles when token changes
  useEffect(() => {
    if (!token) return
    void loadCircles()
  }, [token])

  const filteredCircles = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return circles
    return circles.filter((circle) => circle.name.toLowerCase().includes(term))
  }, [circles, search])

  async function handleAuth() {
    setAuthError(null)
    setAuthLoading(true)
    try {
      const endpoint = authMode === 'login' ? 'login' : 'register'
      const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'Unable to authenticate')
      }

      const body = await res.json()
      if (!body.token) throw new Error('No token returned')

      localStorage.setItem(TOKEN_KEY, body.token)
      setToken(body.token)
      setUsername('')
      setPassword('')
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed')
    } finally {
      setAuthLoading(false)
    }
  }

  async function startGoogleAuth() {
    setAuthError(null)
    try {
      const res = await fetch(`${API_URL}/auth/getAuthUrl`)
      if (!res.ok) throw new Error('Unable to start Google sign-in')
      const { url } = await res.json()
      if (!url) throw new Error('No Google URL returned')
      window.location.href = url
    } catch (err: any) {
      setAuthError(err.message || 'Google sign-in failed')
    }
  }

  async function loadCircles() {
    if (!token) return
    setCirclesLoading(true)
    setCirclesError(null)
    try {
      const res = await fetch(`${API_URL}/circles`, {
        headers: { Authorization: token },
      })

      if (res.status === 401) {
        // Token expired/invalid
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        throw new Error('Session expired. Please sign in again.')
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'Failed to load circles')
      }

      const body = await res.json()
      setCircles(body.circles || [])
    } catch (err: any) {
      setCirclesError(err.message || 'Could not fetch circles')
    } finally {
      setCirclesLoading(false)
    }
  }

  async function connectWallet() {
    if (!token) return
    setWalletStatus(null)
    setWalletLoading(true)
    try {
      const nightly = (window as any)?.nightly?.aptos || (window as any)?.nightly
      const aptos = (window as any)?.aptos
      const wallet = nightly?.connect ? nightly : aptos

      if (!wallet?.connect) {
        throw new Error('Aptos wallet not found. Please install Nightly/Petra/Martian.')
      }

      const account = await wallet.connect()
      const address = account?.address || account?.publicKey || account?.accountAddress
      if (!address) {
        throw new Error('Wallet did not return an address')
      }

      localStorage.setItem(WALLET_KEY, address)
      const res = await fetch(`${API_URL}/auth/wallet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ walletAddress: address }),
      })
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
        throw new Error('Session expired. Please sign in again.')
      }
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(body.message || 'Failed to connect wallet')
      }
      setWalletStatus('Wallet connected successfully.')
      setConnectedAddress(address)
      setCreateStatus(null)
    } catch (err: any) {
      setWalletStatus(err.message || 'Failed to connect wallet')
    } finally {
      setWalletLoading(false)
    }
  }

  function getWalletProvider() {
    const nightly = (window as any)?.nightly?.aptos || (window as any)?.nightly
    const aptos = (window as any)?.aptos
    return nightly || aptos || null
  }

  async function createCircleFlow() {
    console.log('createCircleFlow called');
    if (!token) {
      console.log('No token');
      setCreateStatus('Please sign in first.')
      return
    }
    if (!connectedAddress) {
      console.log('No connectedAddress');
      setCreateStatus('Connect your wallet first.')
      return
    }
    if (!MODULE_ADDRESS) {
      console.log('No MODULE_ADDRESS');
      setCreateStatus('Module address is not configured.')
      return
    }
    if (!circleName.trim()) {
      console.log('No circleName');
      setCreateStatus('Circle name is required.')
      return
    }
    if (!circleDuration || circleDuration <= 0) {
      console.log('Invalid circleDuration', circleDuration);
      setCreateStatus('Duration (days) must be greater than 0.')
      return
    }

    setCreateStatus(null)
    setCreateLoading(true)
    try {
      const wallet = getWalletProvider()
      if (!wallet?.signAndSubmitTransaction) {
        throw new Error('Connect a compatible Aptos wallet before creating a circle.')
      }

      const { hash, circleId } = await createCircleOnChain(
        wallet.signAndSubmitTransaction,
        circleName.trim(),
        circleDuration,
        connectedAddress
      )

      if (circleId === undefined) {
        throw new Error('Could not read circle id from transaction. Please retry.')
      }

      const res = await fetch(`${API_URL}/circles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          onChainId: circleId,
          name: circleName.trim(),
          durationDays: circleDuration,
          transactionHash: hash,
        }),
      })

      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(body.message || 'Failed to save circle in backend')
      }

      setCreateStatus('Circle created successfully.')
      setCircleName('')
      setCircleDuration(30)
      await loadCircles()
    } catch (err: any) {
      setCreateStatus(err.message || 'Failed to create circle')
    } finally {
      setCreateLoading(false)
    }
  }

  async function disconnectWallet() {
    setWalletStatus(null)
    setConnectedAddress(null)
    localStorage.removeItem(WALLET_KEY)
    try {
      await fetch(`${API_URL}/auth/wallet`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({ walletAddress: null }),
      })
    } catch {
      // ignore backend disconnect errors
    }
    try {
      const nightly = (window as any)?.nightly?.aptos || (window as any)?.nightly
      const aptos = (window as any)?.aptos
      const wallet = nightly?.disconnect ? nightly : aptos?.disconnect ? aptos : null
      if (wallet?.disconnect) {
        await wallet.disconnect()
      }
    } catch (err) {
      // best-effort; ignore disconnect failures
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setCircles([])
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide">CircleSave</p>
              <h1 className="text-2xl font-semibold text-gray-900">Sign in to continue</h1>
            </div>
          </div>

          <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium ${authMode === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-md text-sm font-medium ${authMode === 'register' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
              onClick={() => setAuthMode('register')}
            >
              Register
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
                autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
          </div>

          {authError && <p className="text-sm text-red-600">{authError}</p>}

          <div className="space-y-3">
            <button
              onClick={handleAuth}
              disabled={authLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {authLoading ? (
                <>
                  <RefreshCcw className="animate-spin" size={18} />
                  <span>{authMode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  {authMode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                </>
              )}
            </button>

            <button
              onClick={startGoogleAuth}
              className="w-full border border-gray-300 hover:border-teal-500 text-gray-800 font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="CircleSave" className="w-10 h-10 rounded-full object-contain bg-white" />
          <div>
            <p className="text-sm text-gray-500">CircleSave</p>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={loadCircles}
            className="px-3 py-2 text-sm font-medium text-gray-700 border rounded-lg hover:bg-gray-50 flex items-center space-x-2"
          >
            <RefreshCcw size={16} /> <span>Refresh</span>
          </button>
          <button
            onClick={logout}
            className="px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 flex items-center space-x-2"
          >
            <LogOut size={16} /> <span>Log out</span>
          </button>
        </div>
      </header>

      {/* Top tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex space-x-4">
          <TabButton icon={<Home size={16} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <TabButton
            icon={<Users size={16} />}
            label="My Circles"
            active={activeTab === 'circles'}
            onClick={() => setActiveTab('circles')}
          />
          <TabButton
            icon={<Settings size={16} />}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total circles" value={circles.length} />
            <StatCard title="Active circles" value={circles.filter((c) => c.status === 0).length} />
            <StatCard
              title="Closed circles"
              value={circles.filter((c) => c.status !== 0).length}
              subtitle="History from backend"
            />
            <div className="md:col-span-3 bg-white shadow-sm rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome back</h3>
              <p className="text-sm text-gray-600">
                Your data now comes directly from the backend. Use the My Circles tab to explore, or connect your wallet from Settings.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'circles' && (
          <div className="bg-white shadow-sm rounded-xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">My circles</h2>
                <p className="text-sm text-gray-600">Showing data directly from your backend</p>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search circles by name"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-800">Create a new circle</p>
                  <p className="text-xs text-teal-700">Deploys on-chain then syncs to backend.</p>
                </div>
                <span className="text-xs bg-white px-2 py-1 rounded-full border border-teal-100 text-teal-700">
                  Movement / Aptos
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  value={circleName}
                  onChange={(e) => setCircleName(e.target.value)}
                  placeholder="Circle name"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="number"
                  min={1}
                  value={circleDuration}
                  onChange={(e) => setCircleDuration(Number(e.target.value))}
                  placeholder="Duration (days)"
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={createCircleFlow}
                  disabled={createLoading}
                  className="w-full bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-70 flex items-center justify-center space-x-2 px-4"
                >
                  {(() => { console.log('Create circle button rendered'); return null })()}
                  {createLoading ? <RefreshCcw className="animate-spin" size={16} /> : <Users size={16} />}
                  <span>{createLoading ? 'Creating...' : 'Create circle'}</span>
                </button>
              </div>
              {createStatus && (
                <p
                  className={`text-sm ${
                    createStatus.toLowerCase().includes('success') ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {createStatus}
                </p>
              )}
            </div>

            {circlesLoading && (
              <div className="text-sm text-gray-600 flex items-center space-x-2">
                <RefreshCcw className="animate-spin" size={16} />
                <span>Loading circles...</span>
              </div>
            )}

            {circlesError && <p className="text-sm text-red-600">{circlesError}</p>}

            {!circlesLoading && filteredCircles.length === 0 && !circlesError && (
              <p className="text-sm text-gray-600">No circles found. Create or join one from another device, then refresh.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCircles.map((circle) => (
                <div key={circle.id} className="border rounded-xl p-4 hover:shadow-sm transition">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs uppercase text-gray-500">Circle</p>
                      <h3 className="text-lg font-semibold text-gray-900">{circle.name}</h3>
                      {circle.onChainId && <p className="text-xs text-gray-500">On-chain ID: {circle.onChainId}</p>}
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        circle.status === 0 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {circle.status === 0 ? 'Active' : 'Closed'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 space-y-1">
                    <p>Creator: {circle.creator.name || circle.creator.username}</p>
                    <p>Total balance: {circle.totalBalance}</p>
                    <p>Contributors: {circle.contributorCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow-sm rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <Settings size={18} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-600">Connect your wallet to sync deposits/withdrawals.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Wallet</label>
              <p className="text-sm text-gray-600">Connect your Aptos-compatible wallet (Movement Move).</p>
              {connectedAddress ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">Connected:</span> {connectedAddress}
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 flex items-center space-x-2"
                  >
                    <Wallet size={16} />
                    <span>Disconnect wallet</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={walletLoading}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:opacity-70 flex items-center space-x-2"
                >
                  {walletLoading ? <RefreshCcw className="animate-spin" size={16} /> : <Wallet size={16} />}
                  <span>{walletLoading ? 'Connecting...' : 'Connect wallet'}</span>
                </button>
              )}
              {walletStatus && (
                <p className={`text-sm ${walletStatus.includes('successfully') ? 'text-green-700' : 'text-red-600'}`}>
                  {walletStatus}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 ${
        active ? 'border-teal-600 text-teal-700' : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function StatCard({ title, value, subtitle }: { title: string; value: number | string; subtitle?: string }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

export default App
