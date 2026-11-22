import { clearToken, getToken } from './token';

// Адреса бекенду береться зі змінної VITE_API_URL (файл .env.local)
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.status = status;
  }
}

// Що робити, коли сервер відповів 401 (токен недійсний або його немає)
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  // false = не додавати токен і не вважати 401 виходом із системи (потрібно для логіну)
  auth?: boolean;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const useAuth = options.auth !== false;
  const hasBody = options.body !== undefined;

  const headers: Record<string, string> = {};
  if (hasBody) headers['Content-Type'] = 'application/json';
  const token = useAuth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("Немає зв'язку з сервером. Перевірте, чи запущений бекенд.");
  }

  if (!response.ok) {
    if (response.status === 401 && useAuth) {
      clearToken();
      onUnauthorized?.();
    }

    let message = `Помилка сервера (${response.status})`;
    try {
      // Бекенд повертає текст помилки в полі message (рядок або масив рядків)
      const data = await response.json();
      if (data?.message) {
        message = Array.isArray(data.message) ? data.message.join(', ') : String(data.message);
      }
    } catch {
      // тіло відповіді не JSON — залишаємо стандартне повідомлення
    }
    throw new ApiError(message, response.status);
  }

  return (await response.json()) as T;
}

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Сталася невідома помилка';
