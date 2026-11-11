import React from 'react';
import { LayoutDashboard, Users, Handshake, Package, ClipboardList, Settings, LogOut, SquareChevronLeft } from 'lucide-react';
import logoImg from '../assets/BCG_logo.png';

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
    <aside className={`${isOpen ? 'w-64' : 'w-20'} h-screen bg-zinc-900 border-r border-zinc-800 text-zinc-300 flex flex-col justify-between p-4 shrink-0 transition-all duration-300`}>
      <div>
        <div className={`flex items-center ${isOpen ? 'justify-between px-2' : 'justify-center'} border-b border-zinc-800 h-16 mb-6`}>
          {isOpen ? (
            <>
              <div className="flex items-center gap-2 overflow-hidden">
                <img 
                  src={logoImg} 
                  alt="BCG Logo" 
                  className="w-12 h-12 object-contain shrink-0" 
                />
              </div>

              <button
                onClick={toggleSidebar}
                className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 p-1.5 rounded-lg transition-colors shrink-0"
                title="Згорнути меню"
              >
                <SquareChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-lg hover:bg-zinc-800 transition-colors shrink-0 flex items-center justify-center"
              title="Розгорнути меню"
            >
              <img 
                src={logoImg} 
                alt="BCG Logo" 
                className="w-12 h-12 object-contain" 
              />
            </button>
          )}
        </div>

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