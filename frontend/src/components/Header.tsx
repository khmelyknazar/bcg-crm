import React from 'react';
import { MoreVertical } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 bg-zinc-900/50 border-b border-zinc-800 px-6 flex items-center justify-between sticky top-0 backdrop-blur-md z-10">
      <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>

      <div className="flex items-center gap-2">
        <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};