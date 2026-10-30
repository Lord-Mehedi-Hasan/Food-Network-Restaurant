import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('fn_token'));
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChefClubModalOpen, setIsChefClubModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.getMe(token);
          if (res.success) {
            setUser(res.user);
          } else {
            localStorage.removeItem('fn_token');
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error('Error fetching current user:', err);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.success) {
      localStorage.setItem('fn_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const register = async (name, email, password, role = 'customer') => {
    const res = await api.register({ name, email, password, role });
    if (res.success) {
      localStorage.setItem('fn_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setIsAuthModalOpen(false);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const logout = () => {
    localStorage.removeItem('fn_token');
    setToken(null);
    setUser(null);
  };

  const upgradeToChefClub = async (tier = 'chef_club') => {
    if (!token) {
      setIsAuthModalOpen(true);
      return { success: false, message: 'Please log in first' };
    }
    const res = await api.upgradeSubscription(token, tier);
    if (res.success) {
      setUser((prev) => ({
        ...prev,
        subscription: res.subscription,
      }));
      setIsChefClubModalOpen(false);
      return { success: true, message: 'Welcome to Chef Club!' };
    }
    return { success: false, message: res.message };
  };

  const isPremium = Boolean(user?.subscription?.isPremium);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isPremium,
        login,
        register,
        logout,
        upgradeToChefClub,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isChefClubModalOpen,
        setIsChefClubModalOpen,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
