const TOKEN_KEY = 'bcg-token';

// localStorage може бути недоступний, тому всі звернення в try/catch
export const getToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // токен не збережеться, після оновлення сторінки потрібно буде увійти знову
  }
};

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // нічого страшного
  }
};
