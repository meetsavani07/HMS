import { useState, useEffect } from 'react';


interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'enquiry' | 'user';
  department?: string;
  specialization?: string;
}

interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'enquiry' | 'user';
  department?: string;
  specialization?: string;
}

// Mock users database
const mockUsers: UserData[] = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 2,
    email: 'doctor@example.com',
    password: 'doctor123',
    name: 'Dr. John Smith',
    role: 'doctor',
    specialization: 'Cardiology',
  },
  {
    id: 3,
    email: 'nurse@example.com',
    password: 'nurse123',
    name: 'Sarah Johnson',
    role: 'nurse',
    department: 'Emergency',
  },
  {
    id: 4,
    email: 'enquiry@example.com',
    password: 'enquiry123',
    name: 'Emily Davis',
    role: 'enquiry',
    department: 'Front Desk',
  },
  {
    id: 5,
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user',
  },
];

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        ...(user.department && { department: user.department }),
        ...(user.specialization && { specialization: user.specialization }),
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string) => {
    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    // Create new user
    const newUser: UserData = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'user',
    };

    // Add to mock database
    mockUsers.push(newUser);

    // Auto login after signup
    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));

    return { success: true, message: 'Signup successful' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    window.location.href = '/Auth'; // Redirect to login page

  };

  return { isAuthenticated, user, login, logout, signup, isLoading };
};