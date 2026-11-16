import { MoreVertical } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navItems } from '../config/navigation';

export const Header = () => {
  const { pathname } = useLocation();
  const title = navItems.find((item) => pathname.startsWith(item.path))?.label ?? 'Дашборд';

  return (
    <header className="h-16 bg-white border-b border-zinc-300 px-6 flex items-center justify-between shrink-0 z-10">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>

      <div className="flex items-center gap-2">
        <button className="p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
