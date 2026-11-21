// Адреса бекенду береться зі змінної VITE_API_URL (файл .env.local)
const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiError extends Error {}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const hasBody = options.body !== undefined;
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("Немає зв'язку з сервером. Перевірте, чи запущений бекенд.");
  }

  if (!response.ok) {
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
    throw new ApiError(message);
  }

  return (await response.json()) as T;
}

export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Сталася невідома помилка';
