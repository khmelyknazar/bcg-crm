import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { ApiError, getErrorMessage } from '../../api';
import { useAuth } from '../../context/auth-context';
import logoImg from '../../assets/BCG_logo.png';

const inputClass =
  'w-full h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200';

export const LoginPage: FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Введіть email і пароль');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await login(email.trim(), password);
    } catch (err) {
      // 401 з бекенду означає неправильну пару email і пароль
      setError(err instanceof ApiError && err.status === 401 ? 'Невірний email або пароль' : getErrorMessage(err));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200 flex items-center justify-center p-4 font-sans antialiased">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-zinc-300 rounded-xl shadow-sm p-8"
      >
        <div className="flex items-center justify-center gap-1 mb-6">
          <img src={logoImg} alt="BCG Logo" className="w-12 h-12 object-contain" />
          <span className="font-bold text-2xl text-zinc-900 tracking-wider">BCG</span>
        </div>

        <h1 className="text-lg font-semibold text-zinc-900 text-center">Вхід у систему</h1>
        <p className="text-sm text-zinc-500 text-center mt-1 mb-6">Введіть дані свого облікового запису</p>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700">
            Email
            <input
              type="email"
              autoComplete="username"
              className={`${inputClass} mt-1`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Пароль
            <input
              type="password"
              autoComplete="current-password"
              className={`${inputClass} mt-1`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </button>
        </div>
      </form>
    </div>
  );
};
