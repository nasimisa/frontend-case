'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User } from './types';
import { useGetCurrentUser, useLogin, useLogout } from './api';
import { getAccessToken } from '@/shared/utils';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isFetching: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isFetching } = useGetCurrentUser();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ username, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const hasToken = getAccessToken();

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!hasToken,
        isFetching,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return ctx;
};
