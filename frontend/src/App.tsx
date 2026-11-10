import { useState } from 'react'
import { Sidebar, type SidebarItemId } from './components/Sidebar'

const titles: Record<SidebarItemId, string> = {
  analytics: 'Аналитика',
  clients: 'Клиенты',
  deals: 'Сделки',
  products: 'Товары',
  tasks: 'Задачі',
}

function App() {
  const [activeId, setActiveId] = useState<SidebarItemId>('analytics')

  return (
    <div className="flex min-h-svh bg-slate-100 text-slate-900">
      <Sidebar activeId={activeId} onNavigate={setActiveId} />
      <main className="min-w-0 flex-1 px-6 py-8 pt-20 lg:px-10 lg:pt-8">
        <p className="text-sm font-medium text-indigo-600">BCG CRM</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          {titles[activeId]}
        </h1>
      </main>
    </div>
  )
}

export default App
