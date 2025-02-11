import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Calendar,
  User,
  Building2,
  Phone,
  Info,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const UserLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translations } = useLanguage();

  const navigation = [
    { name: translations['nav.home'], to: '/user', icon: Home },
    {
      name: translations['nav.bookAppointment'],
      to: '/user/book-appointment',
      icon: Calendar,
    },
    { name: translations['nav.myDetails'], to: '/user/my-details', icon: User },
    {
      name: translations['nav.facilities'],
      to: '/user/facilities',
      icon: Building2,
    },
    { name: translations['nav.about'], to: '/user/about', icon: Info },
    { name: translations['nav.contact'], to: '/user/contact', icon: Phone },
    {
      name: translations['nav.settings'],
      to: '/user/settings',
      icon: Settings,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <motion.nav
        className="bg-white shadow-md relative"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Link to="/user" className="flex items-center">
                <img
                  src="/src/Frontend/image/MEDICARE.png"
                  alt="MADICARE"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">
                  MADICARE
                </span>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.to
                        ? 'text-lime-600 bg-blue-50'
                        : 'text-gray-700 hover:text-lime-600 hover:bg-lime-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-1" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === item.to
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-16"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default UserLayout;
