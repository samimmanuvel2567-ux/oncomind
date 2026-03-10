import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  User, 
  Stethoscope, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Globe,
  Activity,
  FileText,
  Scan,
  AlertTriangle
} from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ta' : 'en');
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const patientLinks = [
    { path: '/patient', icon: Home, label: t('home') },
    { path: '/patient/symptoms', icon: Activity, label: t('symptoms') },
    { path: '/patient/skin-check', icon: Scan, label: t('skinCheck') },
    { path: '/patient/reports', icon: FileText, label: t('reports') },
    { path: '/patient/dashboard', icon: User, label: t('dashboard') },
  ];

  const doctorLinks = [
    { path: '/doctor', icon: Home, label: t('home') },
    { path: '/doctor/patients', icon: User, label: t('patients') },
    { path: '/doctor/alerts', icon: AlertTriangle, label: t('alerts') },
    { path: '/doctor/analytics', icon: Activity, label: t('analytics') },
  ];

  const adminLinks = [
    { path: '/admin', icon: Home, label: t('home') },
    { path: '/admin/stats', icon: Activity, label: t('stats') },
    { path: '/admin/users', icon: User, label: t('users') },
    { path: '/admin/monitoring', icon: Settings, label: t('monitoring') },
  ];

  const getLinks = () => {
    if (hasRole('patient')) return patientLinks;
    if (hasRole('doctor')) return doctorLinks;
    if (hasRole('admin')) return adminLinks;
    return [];
  };

  const links = getLinks();

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-green-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-green to-primary-dark bg-clip-text text-transparent">{t('appName')}</span>
                <div className="text-xs text-gray-500 -mt-1">AI Cancer Care</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-primary-green to-primary-dark text-white shadow-lg'
                    : 'text-gray-600 hover:bg-green-50 hover:text-primary-green hover:shadow-md'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-600 hover:bg-green-50 hover:text-primary-green rounded-xl transition-all duration-300 group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white shadow-sm"></span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full animate-ping opacity-75"></div>
            </button>

            {/* Language Toggle */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2.5 text-gray-600 hover:bg-green-50 hover:text-primary-green rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">{i18n.language}</span>
              </button>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-28 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-green-100 py-2"
                >
                  <button
                    onClick={toggleLanguage}
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary-green rounded-lg mx-2 transition-colors"
                  >
                    {i18n.language === 'en' ? 'தமிழ்' : 'English'}
                  </button>
                </motion.div>
              )}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-primary-dark rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden lg:block">
                  <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2.5 text-gray-600 hover:bg-red-50 hover:text-danger rounded-xl transition-all duration-300"
                title={t('logout')}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-gray-600 hover:bg-green-50 rounded-xl transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-green-100"
        >
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-primary-green to-primary-dark text-white shadow-lg'
                    : 'text-gray-600 hover:bg-green-50 hover:text-primary-green'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            <div className="border-t border-green-100 pt-2 mt-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-danger w-full transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

