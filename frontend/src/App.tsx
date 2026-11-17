import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ClientsPage } from './components/clients/ClientsPage';
import { DealsPage } from './components/deals/DealsPage';
import { navItems } from './config/navigation';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-8 bg-white border border-zinc-300 shadow-sm rounded-xl text-center text-zinc-500">
      Розділ "{title}" у розробці.
    </div>
  );
}

export default function App() {
  // Початковий стан меню: збережений вибір користувача, інакше залежно від ширини екрана
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebar-open');
      if (saved !== null) return saved === 'true';
    } catch {
      // localStorage може бути недоступний — тоді просто йдемо далі
    }
    return window.innerWidth >= 1024;
  });

  // Запам'ятовуємо вибір при кожній зміні
  useEffect(() => {
    try {
      localStorage.setItem('sidebar-open', String(isSidebarOpen));
    } catch {
      // нічого страшного, налаштування просто не збережеться
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-200 text-zinc-900 font-sans antialiased">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            {/* Редірект: головна адреса "/" перенаправляє на клієнтів */}
            <Route path="/" element={<Navigate to="/clients" replace />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/deals" element={<DealsPage />} />
            {navItems
              .filter((item) => item.path !== '/clients' && item.path !== '/deals')
              .map((item) => (
                <Route key={item.path} path={item.path} element={<Placeholder title={item.label} />} />
              ))}
            {/* Будь-яка неіснуюча адреса теж веде на клієнтів */}
            <Route path="*" element={<Navigate to="/clients" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
