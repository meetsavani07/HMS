import React from 'react';
import { LogOut, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const { language, setLanguage, translations } = useLanguage();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-br from-emerald-800 to-emerald-500 bg-clip-text text-transparent">{translations['settings.title']}</h1>

        <div className="space-y-6 max-w-2xl">
          {/* Language Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900">
                {translations['settings.language']}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  language === 'en'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                {translations['settings.language.english']}
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  language === 'es'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                {translations['settings.language.spanish']}
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  language === 'hi'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                {translations['settings.language.hindi']}
              </button>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {translations['settings.account']}
                </h3>
                <p className="text-sm text-gray-500">
                  {translations['settings.account.description']}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                {translations['settings.logout']}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings