import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/toast';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    setError('');

    if (!email || !password || (isSignup && !name)) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      if (isSignup) {
        const result = await signup(email, password, name);
        if (result.success) {
          showToast.success('Successfully signed up!');
          navigate('/user');
        } else {
          setError(result.message);
        }
      } else {
        const success = await login(email, password);
        if (success) {
          showToast.success('Successfully logged in!');
          navigate('/dashboard');
        } else {
          setError(
            'Invalid credentials. Please check your email and password.'
          );
        }
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-6 lg:px-8 ">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <motion.img
            alt="Logo"
            src="/src/Frontend/image/MEDICARE.png"
            width="100"
            whileHover={{ scale: 1.1 }}
            // className="bg-dark-200 p-2 rounded-lg"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold bg-gradient-to-r from-green-700 to-lime-400 bg-clip-text text-transparent">
          MADICARE
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isSignup ? 'Create your account' : 'Sign in to access the dashboard'}
        </p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10 border rounded-[20px] bg-[#ffffff] shadow-[13px_13px_26px_#d4d4d4,_-13px_-13px_26px_#ffffff]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-950 text-black"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-950 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-950 text-black"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-200 to-teal-500 "
            >
              {isSignup ? 'Sign up' : 'Sign in'}
            </motion.button>

            <div className="text-sm text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-300 hover:text-blue-500"
              >
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>

            {!isSignup && (
              <div className="text-sm text-gray-400 space-y-2">
                <p className="font-medium">Demo Credentials:</p>
                <div className="grid grid-cols-1 gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      handleDemoLogin('admin@example.com', 'password')
                    }
                    className="p-2 bg-gradient-to-br from-green-300 to-green-100 rounded  transition-colors text-left"
                  >
                    <p className="font-medium text-green-900">Admin:</p>
                    <p className="text-teal-500">Email: admin@example.com</p>
                    <p className="text-teal-500">Password: password</p>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      handleDemoLogin('user@example.com', 'user123')
                    }
                    className="p-2 bg-gradient-to-br from-green-300 to-green-100 rounded  transition-colors text-left"
                  >
                    <p className="font-medium text-green-900">User:</p>
                    <p className="text-teal-400">Email: user@example.com</p>
                    <p className="text-teal-400">Password: user123</p>
                  </motion.button>
                </div>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
