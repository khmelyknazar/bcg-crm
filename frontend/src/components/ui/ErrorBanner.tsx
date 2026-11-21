import { X } from 'lucide-react';
import type { FC } from 'react';

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

// Повідомлення про помилку у верхньому куті, поверх модальних вікон
export const ErrorBanner: FC<ErrorBannerProps> = ({ message, onClose }) => (
  <div
    role="alert"
    className="fixed top-4 right-4 z-50 max-w-sm flex items-start gap-3 px-4 py-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg shadow-lg"
  >
    <span className="flex-1">{message}</span>
    <button onClick={onClose} title="Закрити" className="shrink-0 mt-0.5 text-red-400 hover:text-red-700">
      <X className="w-4 h-4" />
    </button>
  </div>
);
