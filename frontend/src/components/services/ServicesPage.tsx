import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCrm } from '../../context/crm-context';
import { useAuth } from '../../context/auth-context';
import type { Service, ServiceFormData } from '../../types/service';
import { formatMoney } from '../../utils/format';
import { ServiceModal } from './ServiceModal';
import { ErrorBanner } from '../ui/ErrorBanner';
import { getErrorMessage, servicesApi } from '../../api';

export const ServicesPage: FC = () => {
  const { services, setServices } = useCrm();
  const { user } = useAuth();
  const canDelete = user?.role === 'OWNER';
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [error, setError] = useState('');

  const visibleServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services
      .filter((s) => !q || s.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name, 'uk'));
  }, [services, query]);

  const openCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setIsModalOpen(true);
  };

  const handleSave = async (data: ServiceFormData) => {
    try {
      if (editing) {
        const updated = await servicesApi.update(editing.id, data);
        setServices((prev) => prev.map((s) => (s.id === editing.id ? updated : s)));
      } else {
        const created = await servicesApi.create(data);
        setServices((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  const handleDelete = async (service: Service) => {
    if (!window.confirm(`Видалити послугу "${service.name}"?`)) return;
    try {
      await servicesApi.remove(service.id);
      setServices((prev) => prev.filter((s) => s.id !== service.id));
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  return (
    <div className="bg-white border border-zinc-300 rounded-xl shadow-sm">
      {error && <ErrorBanner message={error} onClose={() => setError('')} />}
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-zinc-200">
        <div className="relative flex-1 min-w-56 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-zinc-300 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <button
          onClick={openCreate}
          className="ml-auto h-10 px-4 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Додати послугу
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 bg-zinc-50 border-b border-zinc-200">
              <th className="px-4 py-3">Послуга</th>
              <th className="px-4 py-3 text-right">Ціна</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {visibleServices.map((service) => (
              <tr key={service.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-900">{service.name}</td>
                <td className="px-4 py-3 text-right text-zinc-700 tabular-nums whitespace-nowrap">
                  {formatMoney(service.price)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(service)} title="Редагувати" className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {canDelete && (
                      <button onClick={() => handleDelete(service)} title="Видалити" className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleServices.length === 0 && (
          <p className="py-12 text-center text-sm text-zinc-500">Нічого не знайдено</p>
        )}
      </div>

      <div className="px-4 py-3 border-t border-zinc-200 text-xs text-zinc-500">
        Показано {visibleServices.length} з {services.length}
      </div>

      {isModalOpen && (
        <ServiceModal service={editing} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
