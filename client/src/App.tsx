import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Inventory from './pages/Inventory.tsx';
import Subscription from './pages/Subscription.tsx';
import Developer from './pages/Developer.tsx';
import "./index.css";

import AuthModal from './components/AuthModal.tsx';
import VerifyEmail from './pages/VerifyEmail.tsx';
import type { AuthModalType } from './props/AuthModalProps.ts';
import { useAuth } from './contexts/AuthContext.tsx';
import Footer from './components/Footer.tsx';
import Gacha from './pages/Gacha.tsx';
import Store from './pages/Store.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import SuccessPage from './pages/SuccessPage.tsx';
import Profile from './pages/Profile.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

function App() {
  // const [user, setUser] = useState<string | null>(null);
  // const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const { user, token, handleLogin, handleLogout } = useAuth();
  const [activeModalType, setActiveModalType] = useState<AuthModalType>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleMenu = () => {
    setIsNavbarOpen(!isNavbarOpen);
  }

  return (
    // <div className='flex flex-col min-h-screen'></div>
    <BrowserRouter basename='/Gacha-FullStack'>
      {/* Navigation - These stay on screen across all pages */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-green-800 shadow-md text-white">
        <div className='flex p-4 items-center justify-between gap-4'>
          <div className="flex gap-4">
            <Link className="text-2xl md:text-4xl text-white" to="/">GachApp</Link>
          </div>
          <ul className="hidden md:flex gap-4 w-full">
            { user &&
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            }
            
            <li>
              <Link to="/subscription">Subscription</Link>
            </li>
            { user &&
            <li>
              <Link to={`/inventory/${user?.username}`}>Inventory</Link>
            </li>
            }
            { user &&
            <li>
              <Link to="/gacha">Gacha</Link>
            </li>
            }
            {/* { user &&
            <li>
              <Link to="/store">Store</Link>
            </li>
            } */}
            <li>
              <Link to="/developer">Dev</Link>
            </li>
          </ul>
          
          <div className="md:hidden flex items-center">
            {user && 
              <Link to={`/profile/${user?.username}`} className='text-xs hover:underline'>{user?.username}</Link>
            }
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-400 hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >{isNavbarOpen ? (
                // "X" Close Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          

          <div className="hidden md:flex flex-row gap-4 items-center justify-center">
            {/* Pass the function to open it from your Nav/Button */}
            {token ? 
            <>
              <Link to={`/profile/${user?.username}`} className='text-xs hover:underline'>{user?.username}</Link>
              <button 
              onClick={handleLogout}
              className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
            </>
            :
            <>
              <button 
                onClick={() => {
                  setActiveModalType('login');
                }}
                className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setActiveModalType('register');
                }}
                className="bg-transparent text-xs px-4 py-2 text-white rounded"
              >
                <p>Create an Account</p>
              </button>
            </>
            }

          </div>
        </div>
        {/* Mobile Dropdown */}
        <div className={`${isNavbarOpen ? 'block' : 'hidden'} md:hidden bg-green-700 transition-all duration-300 ease-in-out`}>
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-white">
            <Link 
              to="/subscription" 
              onClick={() => setIsNavbarOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-indigo-400"
            >
              Subscription
            </Link>
            {user && 
            <Link 
              to="/dashboard" 
              onClick={() => setIsNavbarOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-indigo-400"
            >
              Dashboard
            </Link>
            }
            {user &&
            <Link 
              to={`/inventory/${user?.username}`} 
              onClick={() => setIsNavbarOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-indigo-400"
            >
              Inventory
            </Link>
            }
            {user &&
            <Link 
              to={`/gacha`} 
              onClick={() => setIsNavbarOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-indigo-400"
            >
              Gacha
            </Link>
            }
            <Link 
              to="/developer" 
              onClick={() => setIsNavbarOpen(false)} 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-indigo-400"
            >
              Developer
            </Link>
            {token ? 
            <>
              
              <div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsNavbarOpen(false);
                  }}
                  className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Logout
                </button>
              </div>
              
            </>
            :
            <>
            <div className='flex w-full gap-4'>
              <div className='w-full'>
                <button 
                  onClick={() => {
                    setActiveModalType('login');
                    setIsNavbarOpen(false);
                  }}
                  className="px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors w-full"
                >
                  Login
                </button>
              </div>
              <div className='w-full'>
                <button 
                  onClick={() => {
                    setActiveModalType('register');
                    setIsNavbarOpen(false);
                  }}
                  className="bg-transparent px-4 py-2 text-white rounded w-full"
                >
                  <p>Create an Account</p>
                </button>
              </div>
              

            </div>
              
            </>
            }
          </div>
        </div>
      </nav>

      {/* The Modal Component */}
      <AuthModal 
        modalType={activeModalType}
        onClose={() => setActiveModalType(null)}
        onSwitch={(modalType) => setActiveModalType(modalType)} 
        onLoginSuccess={handleLogin}
      />

      
      {/* The Switchboard */}
      <Routes>
        <Route path="/" element={<Home onHeroBannerClick={() => setActiveModalType('login')} />} />
        <Route path="/subscription" element={<Subscription onNoUser={() => setActiveModalType('login')}/>} />
        <Route path="/inventory" element={(user && token) ? <div className='flex w-full justify-center'><p>Inventory not found.</p></div> : <Navigate to="/" /> } />
        <Route path="/inventory/undefined" element={<Navigate to="/" replace />} />
        <Route path="/inventory/:username" element={<Inventory /> } />
        <Route path="/developer" element={<Developer />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path="/gacha" element={<ProtectedRoute><Gacha /></ProtectedRoute> } />
        <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute> } />
        <Route path="/payment-success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
      </Routes>
      <div className='flex grow'/>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App
