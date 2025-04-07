// context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of your user object (adjust as needed)
interface User {
  id: string;
  email: string;
  // add more fields like name, token, etc.
}

// Define the context value
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  profileComplete: boolean;
  setProfileComplete: (complete: boolean) => void;
}

// Create context with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider wrapper
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, profileComplete, setProfileComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};