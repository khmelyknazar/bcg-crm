import { useLocation } from 'react-router-dom';
import { navItems } from '../config/navigation';

export const Header = () => {
  const { pathname } = useLocation();
  const title = navItems.find((item) => pathname.startsWith(item.path))?.label ?? 'Дашборд';

  return (
    <header className="h-16 bg-white border-b border-zinc-300 px-6 flex items-center justify-between shrink-0 z-10">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
    </header>
  );
};
