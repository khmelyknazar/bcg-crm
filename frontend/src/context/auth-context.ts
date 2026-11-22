import { createContext, useContext } from 'react';
import type { AuthUser } from '../types/auth';

// checking — перевіряємо збережений токен, guest — не увійшли, authed — увійшли
export type AuthStatus = 'checking' | 'guest' | 'authed';

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth потрібно викликати всередині AuthProvider');
  return ctx;
}
