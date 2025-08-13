import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Container from './Container';

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold gradient-text tracking-tight">
              FurToon
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/create" 
                className={`nav-link ${isActive('/create') || isActive('/upload') ? 'nav-link-active' : ''}`}
              >
                Create
              </Link>
              <Link 
                to="/styles" 
                className={`nav-link ${isActive('/styles') ? 'nav-link-active' : ''}`}
              >
                Styles
              </Link>
              <Link 
                to="/pricing" 
                className={`nav-link ${isActive('/pricing') ? 'nav-link-active' : ''}`}
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 nav-link"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {user?.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block">{user?.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900">{user?.email}</p>
                        <p className="text-xs text-slate-500">
                          Credits: {isAdmin() ? "∞ Unlimited" : (user?.credits_remaining || 0)}
                        </p>
                        {isAdmin() && (
                          <p className="text-xs text-green-600 font-medium">Admin Account</p>
                        )}
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/create"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Create Portrait
                      </Link>
                      <Link
                        to="/pricing"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Buy Credits
                      </Link>
                      <div className="border-t border-slate-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`nav-link ${isActive('/login') ? 'nav-link-active' : ''}`}
                >
                  Login
                </Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  size="sm"
                  className="text-decoration-none"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar; 