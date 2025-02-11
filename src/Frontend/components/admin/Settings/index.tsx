import React from 'react';
import { LogOut } from 'lucide-react'; // Import the Logout icon from lucide-react
import { useAuth } from '../../../hooks/useAuth'; // Import the custom useAuth hook to handle authentication logic



const SettingsPage: React.FC = () => {
  // Destructure the logout function from the useAuth hook
  const { logout } = useAuth();
  
  // Handle the logout action when the user clicks the logout button
  const handleLogout = async () => {
    logout(); // Call the logout function to log the user out
  };

  return (
    <div className="space-y-6">
      {/* Settings Page Header */}
      <h2 className="text-2xl font-bold flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">
        Settings
      </h2>

      {/* Card containing the logout section */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 space-y-6">
          {/* Account Section with Logout Button */}
          <div className="flex items-center justify-between">
            <div>
              {/* Account Section Title */}
              <h3 className="text-lg font-medium text-gray-900">
                Account
              </h3>
              {/* Account description text */}
              <p className="text-sm text-gray-500">
                Sign out of your account
              </p>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout} // Call the handleLogout function when the button is clicked
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="h-5 w-5" /> {/* Display logout icon */}
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;