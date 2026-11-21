import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/crm-context';
import { STATUS_LABELS } from '../../types/client';
import type { Client, ClientFormData, ClientStatus } from '../../types/client';
import { ErrorBanner } from '../ui/ErrorBanner';
import { clientsApi, getErrorMessage } from '../../api';
import { ClientModal } from './ClientModal';

const statusStyles: Record<ClientStatus, string> = {
  lead: 'bg-amber-50 text-amber-800 border-amber-200',
  active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  inactive: 'bg-zinc-100 text-zinc-600 border-zinc-300',
};

export const ClientsPage: FC = () => {
  const { clients, setClients, setDeals, setTasks } = useCrm();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Список перераховується тільки коли змінюються дані, пошук або фільтр
  const visibleClients = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clients.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesQuery =
        !q || [c.name, c.company, c.edrpou, c.email, c.phone].some((field) => field.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [clients, query, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditing(client);
    setIsModalOpen(true);
  };

  const handleSave = async (data: ClientFormData) => {
    try {
      if (editing) {
        const saved = await clientsApi.update(editing.id, data);
        setClients((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
      } else {
        const created = await clientsApi.create(data);
        setClients((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (e) {
      setActionError(getErrorMessage(e));
    }
  };

  const handleDelete = async (client: Client) => {
    if (!window.confirm(`Видалити клієнта "${client.name}" разом з його угодами та завданнями?`)) return;
    try {
      await clientsApi.remove(client.id);
      setClients((prev) => prev.filter((c) => c.id !== client.id));
      // бекенд теж видаляє угоди та завдання клієнта (Cascade), тому прибираємо їх і в себе
      setDeals((prev) => prev.filter((d) => d.clientId !== client.id));
      setTasks((prev) => prev.filter((t) => t.clientId !== client.id));
    } catch (e) {
      setActionError(getErrorMessage(e));
    }
  };

  return (
    <div className="bg-white border border-zinc-300 rounded-xl shadow-sm">
      {/* Панель інструментів */}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-zinc-200">
        <div className="relative flex-1 min-w-56 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за ім'ям, компанією, ЄДРПОУ..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-zinc-300 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ClientStatus | 'all')}
        >
          <option value="all">Усі статуси</option>
          {(Object.keys(STATUS_LABELS) as ClientStatus[]).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </Select>

        <button
          onClick={openCreate}
          className="ml-auto h-10 px-4 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Додати клієнта
        </button>
      </div>

      {/* Таблиця */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 bg-zinc-50 border-b border-zinc-200">
              <th className="px-4 py-3">Клієнт</th>
              <th className="px-4 py-3">Компанія</th>
              <th className="px-4 py-3">ЄДРПОУ</th>
              <th className="px-4 py-3">Телефон</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Створено</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {visibleClients.map((c) => (
              <tr key={c.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-900">{c.name}</p>
                  <p className="text-zinc-500 text-xs">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-zinc-700">{c.company || '—'}</td>
                <td className="px-4 py-3 text-zinc-700 tabular-nums">{c.edrpou || '—'}</td>
                <td className="px-4 py-3 text-zinc-700 whitespace-nowrap">{c.phone || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium border rounded-md ${statusStyles[c.status]}`}>
                    {STATUS_LABELS[c.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{c.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(c)} title="Редагувати" className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(c)} title="Видалити" className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleClients.length === 0 && (
          <p className="py-12 text-center text-sm text-zinc-500">Нічого не знайдено</p>
        )}
      </div>

      <div className="px-4 py-3 border-t border-zinc-200 text-xs text-zinc-500">
        Показано {visibleClients.length} з {clients.length}
      </div>

      {actionError && <ErrorBanner message={actionError} onClose={() => setActionError(null)} />}

      {isModalOpen && (
        <ClientModal client={editing} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
