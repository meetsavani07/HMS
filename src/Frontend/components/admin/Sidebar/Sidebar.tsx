import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Calendar,
  UserPlus,
  Activity,
  Settings,
  Package,
  Shield,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Receipt,
  User,
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  onCollapse,
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const NavLink = ({
    to,
    icon: Icon,
    children,
  }: {
    to: string;
    icon: any;
    children: React.ReactNode;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => window.innerWidth < 768 && onClose()}
        className={`group flex items-center px-6 py-3 transition-all duration-300 relative rounded-lg  ${
          isActive
            ? 'bg-gradient-to-br from-emerald-800 to-green-300 text-white shadow-md'
            : 'text-gray-500 hover:from-lime-400 hover:text-lime-500'
        }`}
        title={isCollapsed ? children.toString() : undefined}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Icon
            className={`h-5 w-5 transition-transform duration-200 ${
              isActive
                ? 'text-white'
                : 'text-gray-500 group-hover:text-teal-600'
            }`}
          />
          {!isCollapsed && (
            <span
              className={`ml-3 font-medium ${isActive ? 'text-white' : ''}`}
            >
              {children}
            </span>
          )}
        </motion.div>

        {isCollapsed && (
          <div className="absolute left-full ml-2 px-3 py-2 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {children}
          </div>
        )}
      </Link>
    );
  };

  const getAvailableMenuItems = () => {
    const items = [];
    items.push({ to: '/', icon: Home, label: 'Dashboard' });

    switch (user?.role) {
      case 'admin':
        items.push(
          { to: '/patients', icon: Users, label: 'Patients' },
          { to: '/appointments', icon: Calendar, label: 'Appointments' },
          { to: '/staff', icon: UserPlus, label: 'Staff' },
          { to: '/supplies', icon: Package, label: 'Supplies' },
          { to: '/billing', icon: Receipt, label: 'Billing' },
          { to: '/insurance', icon: Shield, label: 'Insurance' },
          { to: '/support', icon: HeadphonesIcon, label: 'Support' }
        );
        break;
    }

    items.push({ to: '/settings', icon: Settings, label: 'Settings' });
    return items;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-50 z-20 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <button
        onClick={onClose}
        className="fixed top-2 left-5 z-20 md:hidden bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <motion.aside
        className={`fixed top-4 left-4 h-[calc(100vh-32px)] bg-white text-black shadow-2xl z-30 rounded-2xl flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        {/* Header */}
        <div
          className={`p-6 flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 p-1.5 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <h1 className="text-2xl font-bold bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">
                MADICARE
              </h1>
            )}
          </motion.div>
          <button
            onClick={onCollapse}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <motion.div
            className="mx-4 p-4 rounded-xl bg-white hover:from-green-100 hover:to-green-200 transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <User className="h-5 w-5 text-lime-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-600 capitalize truncate">
                  {user?.role}
                  {user?.specialization && ` - ${user.specialization}`}
                  {user?.department && ` - ${user.department}`}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Links with Scrollbar */}
        <nav className="mt-6 flex-1 overflow-y-auto px-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {getAvailableMenuItems().map((item) => (
            <NavLink key={item.to} to={item.to} icon={item.icon}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;