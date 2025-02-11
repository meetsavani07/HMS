import { LanguageProvider } from './contexts/LanguageContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/Auth/LoginPage';
import Sidebar from './components/admin/Sidebar/Sidebar';
import Dashboard from './components/admin/Dashboard';
import PatientList from './components/admin/PatientList';
import AppointmentsPage from './components/admin/Appointments';
import StaffPage from './components/admin/Staff';
import SuppliesPage from './components/admin/Supplies';
import BillingPage from './components/admin/Billing';
import InsurancePage from './components/admin/Insurance';
import SupportPage from './components/admin/Support';
import SettingsPage from './components/admin/Settings';
import { useSidebar } from './hooks/useSidebar';
import { useAuth } from './hooks/useAuth';
import LoadingOverlay from './components/common/LoadingOverlay';
import UserLayout from './components/User/UserLayout';
import Home from './components/User/Home';
import BookAppointment from './components/User/BookAppointment';
import MyDetails from './components/User/MyDetails';
import Facilities from './components/User/Facilities';
import About from './components/User/About';
import Contact from './components/User/Contact';
import Settings from './components/User/Settings';

const App = () => {
  const { isOpen, toggle, isCollapsed, toggleCollapse } = useSidebar();
  const { isAuthenticated, isLoading, user } = useAuth();

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
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <LoginPage />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1E293B',
                color: '#fff',
              },
            }}
          />
        </div>
      </LanguageProvider>
    );
  }

  if (user?.role === 'user') {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="book-appointment" element={<BookAppointment />} />
              <Route path="my-details" element={<MyDetails />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1E293B',
                color: '#fff',
              },
            }}
          />
        </div>
      </LanguageProvider>
    );
  }

  return (
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
            <Route
              path="/"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'doctor', 'nurse', 'enquiry']}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients"
              element={
                <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse']}>
                  <PatientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'doctor', 'nurse', 'enquiry']}
                >
                  <AppointmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StaffPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/supplies"
              element={
                <ProtectedRoute allowedRoles={['admin', 'nurse']}>
                  <SuppliesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <BillingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/insurance"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <InsurancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute allowedRoles={['admin', 'enquiry']}>
                  <SupportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute
                  allowedRoles={['admin', 'doctor', 'nurse', 'enquiry']}
                >
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1E293B',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

// Route guard component
const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingOverlay isLoading={true}>
        <div />
      </LoadingOverlay>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={user?.role === 'user' ? '/user' : '/'} />;
  }

  return <>{children}</>;
};

export default App;