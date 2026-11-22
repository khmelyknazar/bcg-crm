import { LogOut, SquareChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../config/navigation';
import { useAuth } from '../context/auth-context';
import { ROLE_LABELS } from '../types/auth';
import logoImg from '../assets/BCG_logo.png';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  return (
    <aside
      className={`${isOpen ? 'w-60' : 'w-20'} h-screen bg-white border-r border-zinc-300 text-zinc-600 flex flex-col justify-between shrink-0 transition-all duration-200 z-20`}
    >
      <div>
        {/* Верхній блок: висота h-16 така сама, як у шапки, тому лінії на одному рівні */}
        <div
          className={`flex items-center h-16 border-b border-zinc-300 ${isOpen ? 'justify-between px-4' : 'justify-center'}`}
        >
          {isOpen ? (
            <>
              <div className="flex items-center gap-0.5 overflow-hidden">
                <img src={logoImg} alt="BCG Logo" className="w-11 h-11 object-contain shrink-0" />
                <span className="font-bold text-xl text-zinc-900 tracking-wider relative -top-[2px]">BCG</span>
              </div>

              <button
                onClick={toggleSidebar}
                className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 p-1.5 rounded-lg transition-colors shrink-0"
                title="Згорнути меню"
              >
                <SquareChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-zinc-100 transition-colors shrink-0 flex items-center justify-center"
              title="Розгорнути меню"
            >
              <img src={logoImg} alt="BCG Logo" className="w-11 h-11 object-contain" />
            </button>
          )}
        </div>

        {/* Навігація: кожен пункт — посилання на свою адресу */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={!isOpen ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center'} py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-semibold'
                      : 'hover:bg-zinc-50 hover:text-zinc-900 text-zinc-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} />
                    {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Профіль */}
      <div className={`border-t border-zinc-300 p-4 flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-xs font-semibold text-zinc-800 shrink-0">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          {isOpen && (
            <div className="text-xs overflow-hidden whitespace-nowrap">
              <p className="font-semibold text-zinc-900">{user?.name}</p>
              <p className="text-zinc-500 text-[11px]">{user ? ROLE_LABELS[user.role] : ""}</p>
            </div>
          )}
        </div>
        {isOpen && (
          <button
            onClick={logout}
            title="Вийти"
            className="text-zinc-400 hover:text-zinc-700 p-1.5 transition-colors shrink-0 hover:bg-zinc-100 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
