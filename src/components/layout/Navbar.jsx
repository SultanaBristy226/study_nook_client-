import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon, HiChevronDown } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
    setDropdownOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-primary-600 dark:text-primary-400'
        : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">SN</span>
            </div>
            <span className="font-heading font-bold text-xl text-slate-800 dark:text-white">StudyNook</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/rooms" className={linkClass}>Rooms</NavLink>
            {user && (
              <>
                <NavLink to="/add-room" className={linkClass}>Add Room</NavLink>
                <NavLink to="/my-listings" className={linkClass}>My Listings</NavLink>
                <NavLink to="/my-bookings" className={linkClass}>My Bookings</NavLink>
              </>
            )}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(p => !p)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-700"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">{user.name}</span>
                  <HiChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50"
                    >
                      <Link to="/my-listings" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setDropdownOpen(false)}>My Listings</Link>
                      <Link to="/my-bookings" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => setDropdownOpen(false)}>My Bookings</Link>
                      <hr className="my-1 border-slate-100 dark:border-slate-700" />
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileOpen(p => !p)} className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-3">
              <NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>Home</NavLink>
              <NavLink to="/rooms" className={linkClass} onClick={() => setMobileOpen(false)}>Rooms</NavLink>
              {user ? (
                <>
                  <NavLink to="/add-room" className={linkClass} onClick={() => setMobileOpen(false)}>Add Room</NavLink>
                  <NavLink to="/my-listings" className={linkClass} onClick={() => setMobileOpen(false)}>My Listings</NavLink>
                  <NavLink to="/my-bookings" className={linkClass} onClick={() => setMobileOpen(false)}>My Bookings</NavLink>
                  <button onClick={handleLogout} className="text-sm font-medium text-red-600">Logout</button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" className="btn-secondary text-sm py-2 px-4" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-4" onClick={() => setMobileOpen(false)}>Register</Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
