import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import AppointmentsPage from './components/Appointments';
import StaffPage from './components/Staff';
import SuppliesPage from './components/Supplies';
import InsurancePage from './components/Insurance';
import SupportPage from './components/Support';
import LoginPage from './components/Auth/LoginPage';
import { useSidebar } from './hooks/useSidebar';
import { useAuth } from './hooks/useAuth';
import LoadingOverlay from './components/common/LoadingOverlay';

function App() {
  const { isOpen, toggle, isCollapsed, toggleCollapse } = useSidebar();
  const { isAuthenticated, isLoading } = useAuth();

  // Protect routes
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingOverlay isLoading={true}>
          <div />
        </LoadingOverlay>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          isOpen={isOpen}
          onClose={toggle}
          isCollapsed={isCollapsed}
          onCollapse={toggleCollapse}
        />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            isOpen ? (isCollapsed ? 'md:pl-20' : 'md:pl-64') : 'pl-0'
          }`}
        >
          <div className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/supplies" element={<SuppliesPage />} />
              <Route path="/insurance" element={<InsurancePage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;