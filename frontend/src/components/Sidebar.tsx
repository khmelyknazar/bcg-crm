import { useState, type ReactNode } from 'react'

export const sidebarItems = [
  {
    id: 'analytics',
    label: 'Аналитика',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19V5m0 14h16M8 16v-4m4 4V8m4 8v-6"
      />
    ),
  },
  {
    id: 'clients',
    label: 'Клиенты',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m14-8a3 3 0 1 0-2.2-5M17 11h4m-2-2v4M9.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      />
    ),
  },
  {
    id: 'deals',
    label: 'Сделки',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm0 0 2.2-3.3A1 1 0 0 1 7.03 4h9.94a1 1 0 0 1 .83.45L20 8M12 12v3"
      />
    ),
  },
  {
    id: 'products',
    label: 'Товары',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v9m0 0 8-4.5M12 12 4 7.5"
      />
    ),
  },
  {
    id: 'tasks',
    label: 'Задачи',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 11.5 11 13.5 15.5 9M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      />
    ),
  },
] as const

export type SidebarItemId = (typeof sidebarItems)[number]['id']

type SidebarProps = {
  activeId?: SidebarItemId
  defaultActiveId?: SidebarItemId
  onNavigate?: (id: SidebarItemId) => void
  userName?: string
  userRole?: string
}

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function Sidebar({
  activeId,
  defaultActiveId = 'analytics',
  onNavigate,
  userName = 'Менеджер',
  userRole = 'Продажи',
}: SidebarProps) {
  const [internalActiveId, setInternalActiveId] = useState<SidebarItemId>(defaultActiveId)
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentId = activeId ?? internalActiveId

  function select(id: SidebarItemId) {
    if (activeId === undefined) {
      setInternalActiveId(id)
    }
    onNavigate?.(id)
    setMobileOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-40 inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls="crm-sidebar"
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span className="sr-only">{mobileOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
        <NavIcon>
          {mobileOpen ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </NavIcon>
      </button>

      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          aria-label="Закрыть меню"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        id="crm-sidebar"
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5">
          <span className="inline-flex size-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-semibold text-white">
            BC
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">BCG CRM</p>
            <p className="truncate text-xs text-slate-400">Рабочее пространство</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Разделы CRM">
          {sidebarItems.map((item) => {
            const active = item.id === currentId
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => select(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-500/15 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <NavIcon>{item.icon}</NavIcon>
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-200">
              {userName.slice(0, 1).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{userName}</p>
              <p className="truncate text-xs text-slate-400">{userRole}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
