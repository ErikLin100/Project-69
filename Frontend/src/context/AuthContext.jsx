import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed. Current user:', user ? user.uid : 'No user');
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (user) => {
    console.log('Login called with user:', user ? user.uid : 'No user');
    setUser(user);
  };

  const logout = async () => {
    console.log('Logout called');
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}