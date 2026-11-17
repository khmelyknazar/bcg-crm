import { ChevronDown } from 'lucide-react';
import type { SelectHTMLAttributes } from 'react';

// Власний вигляд списку: вимикаємо рідну відмальовку браузера (appearance-none)
// і додаємо свою стрілку. className застосовується до обгортки (для відступів).
export const Select = ({ className = '', children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className={`relative ${className}`}>
    <select
      {...props}
      className="appearance-none w-full h-10 pl-3 pr-9 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-700 cursor-pointer hover:border-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
    >
      {children}
    </select>
    <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);
