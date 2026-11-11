import React from 'react';
import { LayoutDashboard, Users, Handshake, Package, ClipboardList, Settings, LogOut, SquareChevronLeft, SquareChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'analytics', icon: LayoutDashboard, label: 'Аналітика' },
    { id: 'clients', icon: Users, label: 'Клієнти' },
    { id: 'deals', icon: Handshake, label: 'Угоди' },
    { id: 'services', icon: Package, label: 'Послуги' },
    { id: 'tasks', icon: ClipboardList, label: 'Завдання' },
    { id: 'settings', icon: Settings, label: 'Налаштування' },
  ];

  return (
    // Изменили w-[72px] на w-20, чтобы ничего не обрезалось по краям
    <aside className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-zinc-900 border-r border-zinc-800 text-zinc-300 flex flex-col justify-between p-4 shrink-0 transition-all duration-300`}>
      <div>
        {/* Шапка сайдбара: контейнер с фиксированной высотой (h-16), чтобы меню не прыгало по вертикали */}
        <div className={`flex items-center ${isOpen ? 'justify-between px-2' : 'justify-center'} border-b border-zinc-800 h-16 mb-6`}>
          
          {isOpen ? (
            <>
              {/* Левая часть: Иконка B + Текст BCG */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-bold text-zinc-950 text-sm shrink-0">
                  B
                </div>
                <span className="font-semibold text-white tracking-wide text-[15px] leading-tight">
                  BCG
                </span>
              </div>

              {/* Правая часть: Кнопка сворачивания */}
              <button
                onClick={toggleSidebar}
                className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 p-1.5 rounded-lg transition-colors shrink-0"
                title="Згорнути меню"
              >
                <SquareChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            /* Когда свернуто: Иконка B полностью убирается, вместо нее по центру встает кнопка */
            <button
              onClick={toggleSidebar}
              className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 p-1.5 rounded-lg transition-colors shrink-0"
              title="Розгорнути меню"
            >
              <SquareChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Навигация */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={!isOpen ? item.label : undefined}
                className={`flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center'} py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'hover:bg-zinc-800/50 hover:text-zinc-200 text-zinc-400'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Низ: Профиль */}
      <div className="flex flex-col gap-4">
        <div className={`border-t border-zinc-800 pt-4 flex items-center ${isOpen ? 'justify-between px-2' : 'justify-center'} `}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-200 shrink-0">
              М
            </div>
            {isOpen && (
              <div className="text-xs overflow-hidden whitespace-nowrap">
                <p className="font-medium text-zinc-200">Михайло</p>
                <p className="text-zinc-500 text-[11px]">Менеджер</p>
              </div>
            )}
          </div>
          {isOpen && (
            <button className="text-zinc-500 hover:text-zinc-300 p-1.5 transition-colors shrink-0 hover:bg-zinc-800 rounded-lg">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};