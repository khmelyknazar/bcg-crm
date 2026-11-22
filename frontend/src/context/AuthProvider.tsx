import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './auth-context';
import type { AuthStatus } from './auth-context';
import { authApi } from '../api';
import { setUnauthorizedHandler } from '../api/http';
import { clearToken, getToken, setToken } from '../api/token';
import type { AuthUser } from '../types/auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  // Якщо токен уже є, спочатку перевіряємо його на сервері
  const [status, setStatus] = useState<AuthStatus>(() => (getToken() ? 'checking' : 'guest'));

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus('guest');
  }, []);

  // Будь-який запит із відповіддю 401 розлогінює користувача
  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  // При запуску дізнаємось, хто увійшов (ім'я та роль для сайдбару)
  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false;

    authApi
      .me()
      .then((me) => {
        if (cancelled) return;
        setUser(me);
        setStatus('authed');
      })
      .catch(() => {
        // 401 вже розлогінив користувача; інші помилки (сервер вимкнений) ведуть на сторінку входу
        if (!cancelled) setStatus('guest');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login(email, password);
    setToken(result.accessToken);
    setUser(result.user);
    setStatus('authed');
  }, []);

  return <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>;
}
