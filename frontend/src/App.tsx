import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export default function App() {
  const [activeTab, setActiveTab] = useState('clients');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getTitle = () => {
    switch (activeTab) {
      case 'analytics': return 'Аналітика';
      case 'clients': return 'Клієнти';
      case 'deals': return 'Угоди';
      case 'services': return 'Послуги';
      case 'tasks': return 'Завдання';
      case 'settings': return 'Налаштування';
      default: return 'Дашборд';
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-200 text-zinc-900 font-sans antialiased">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Header title={getTitle()} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'analytics' && (
            <div className="p-8 bg-white border border-zinc-200 shadow-sm rounded-xl text-center text-zinc-500">
              Розділ "Аналітика" у розробці. Перейдіть до вкладки "Клієнти".
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="p-8 bg-white border border-zinc-200 shadow-sm rounded-xl text-center text-zinc-500">
              Тут буде таблиця клієнтів (кнопки вже працюють!).
            </div>
          )}

          {['deals', 'services', 'tasks', 'settings'].includes(activeTab) && (
            <div className="p-8 bg-white border border-zinc-200 shadow-sm rounded-xl text-center text-zinc-500">
              Розділ у розробці.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
