import { Link, useLocation } from 'react-router-dom';
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
  X
} from 'lucide-react';

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
  onCollapse
}) => {
  const location = useLocation();

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
        className={`flex items-center px-6 py-3 transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`}
        title={isCollapsed ? children.toString() : undefined}
      >
        <Icon className="h-5 w-5" />
        {!isCollapsed && <span className="ml-3">{children}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={onClose}
        className="fixed top-4 left-4 z-30 md:hidden bg-white p-2 rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-all duration-300 ease-in-out z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            {!isCollapsed && <h1 className="text-2xl font-bold text-blue-600">HMS</h1>}
          </div>
          <button
            onClick={onCollapse}
            className="hidden md:block text-gray-500 hover:text-gray-700"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="mt-6">
          <NavLink to="/" icon={Home}>Dashboard</NavLink>
          <NavLink to="/patients" icon={Users}>Patients</NavLink>
          <NavLink to="/appointments" icon={Calendar}>Appointments</NavLink>
          <NavLink to="/staff" icon={UserPlus}>Staff</NavLink>
          <NavLink to="/supplies" icon={Package}>Supplies</NavLink>
          <NavLink to="/insurance" icon={Shield}>Insurance</NavLink>
          <NavLink to="/support" icon={HeadphonesIcon}>Support</NavLink>
          <NavLink to="/settings" icon={Settings}>Settings</NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;