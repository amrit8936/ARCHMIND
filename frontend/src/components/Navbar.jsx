import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, LogOut, LayoutDashboard, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isAuth, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-cyan transition-all duration-300">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">ArchMind</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                    isActive('/dashboard') ? 'text-cyan-400 bg-cyan-400/10' : ''
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/generate"
                  className={`nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                    isActive('/generate') ? 'text-cyan-400 bg-cyan-400/10' : ''
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  New Design
                </Link>
                <div className="w-px h-5 bg-slate-700 mx-2" />
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    Hi, <span className="text-gray-200 font-medium">{user?.name}</span>
                  </span>
                  <button
                    id="logout-btn"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-rose-400 text-sm font-medium transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Login</Link>
                <Link to="/signup" className="btn-primary text-sm px-4 py-2">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-gray-200 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900/95 border-t border-slate-800/60 px-4 py-4 space-y-2 animate-fade-up">
          {isAuth ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-700/50 transition-all">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/generate" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-700/50 transition-all">
                <Plus className="w-4 h-4" /> New Design
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-rose-400 py-2 px-3 rounded-lg hover:bg-rose-500/10 transition-all w-full text-left">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-300 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-700/50 transition-all">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block btn-primary text-center mt-2">Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
