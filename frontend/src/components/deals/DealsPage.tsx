import { useMemo, useState } from 'react';
import type { DragEvent, FC } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/crm-context';
import { DEAL_STATUS_LABELS } from '../../types/deal';
import type { Deal, DealFormData, DealStatus } from '../../types/deal';
import { formatMoney, today } from '../../utils/format';
import { DealModal } from './DealModal';

const statusStyles: Record<DealStatus, string> = {
  OPEN: 'bg-sky-50 text-sky-800 border-sky-200',
  WON: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  LOST: 'bg-red-50 text-red-700 border-red-200',
};

export const DealsPage: FC = () => {
  const { clients, deals, setDeals, stages } = useCrm();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DealStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Deal | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [overStageId, setOverStageId] = useState<number | null>(null);

  // Словник "id клієнта -> клієнт", щоб швидко знаходити ім'я за clientId
  const clientsById = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);

  const visibleDeals = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter((d) => {
      const client = clientsById.get(d.clientId);
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        (client?.name.toLowerCase().includes(q) ?? false) ||
        (client?.company.toLowerCase().includes(q) ?? false);
      return matchesStatus && matchesQuery;
    });
  }, [deals, clientsById, query, statusFilter]);

  const openDeals = deals.filter((d) => d.status === 'OPEN');
  const openTotal = openDeals.reduce((sum, d) => sum + d.amount, 0);

  const openCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (deal: Deal) => {
    setEditing(deal);
    setIsModalOpen(true);
  };

  const handleSave = (data: DealFormData) => {
    // Закрита угода (виграна або програна) отримує дату закриття, відкрита — ні
    const closedAtFor = (previous: string | null) => (data.status === 'OPEN' ? null : (previous ?? today()));

    if (editing) {
      setDeals((prev) =>
        prev.map((d) => (d.id === editing.id ? { ...d, ...data, closedAt: closedAtFor(d.closedAt) } : d))
      );
    } else {
      const newDeal: Deal = {
        ...data,
        id: deals.reduce((max, d) => Math.max(max, d.id), 0) + 1,
        createdAt: today(),
        closedAt: closedAtFor(null),
      };
      setDeals((prev) => [newDeal, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (deal: Deal) => {
    if (window.confirm(`Видалити угоду "${deal.title}"?`)) {
      setDeals((prev) => prev.filter((d) => d.id !== deal.id));
    }
  };

  const moveDeal = (dealId: number, stageId: number) => {
    setDeals((prev) => prev.map((d) => (d.id === dealId ? { ...d, stageId } : d)));
  };

  // Перетягування карток між колонками (вбудований drag-and-drop браузера)
  const handleDragStart = (e: DragEvent, deal: Deal) => {
    e.dataTransfer.setData('text/plain', String(deal.id));
    e.dataTransfer.effectAllowed = 'move';
    setDraggingId(deal.id);
  };

  const resetDrag = () => {
    setDraggingId(null);
    setOverStageId(null);
  };

  const handleDrop = (e: DragEvent, stageId: number) => {
    e.preventDefault();
    const dealId = Number(e.dataTransfer.getData('text/plain'));
    if (dealId) moveDeal(dealId, stageId);
    resetDrag();
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Панель інструментів */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-zinc-300 rounded-xl shadow-sm">
        <div className="relative flex-1 min-w-56 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою або клієнтом..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-zinc-300 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DealStatus | 'all')}
        >
          <option value="all">Усі статуси</option>
          {(Object.keys(DEAL_STATUS_LABELS) as DealStatus[]).map((s) => (
            <option key={s} value={s}>{DEAL_STATUS_LABELS[s]}</option>
          ))}
        </Select>

        <p className="text-sm text-zinc-500 ml-2">
          Відкрито: <span className="font-semibold text-zinc-900">{openDeals.length}</span> на{' '}
          <span className="font-semibold text-zinc-900">{formatMoney(openTotal)}</span>
        </p>

        <button
          onClick={openCreate}
          className="ml-auto h-10 px-4 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Додати угоду
        </button>
      </div>

      {/* Дошка: одна колонка на кожен етап */}
      <div className="flex gap-4 overflow-x-auto items-start pb-2">
        {stages.map((stage) => {
          const stageDeals = visibleDeals.filter((d) => d.stageId === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);
          const isOver = overStageId === stage.id && draggingId !== null;

          return (
            <section
              key={stage.id}
              onDragOver={(e) => {
                e.preventDefault();
                setOverStageId(stage.id);
              }}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`w-72 shrink-0 rounded-xl border transition-colors ${
                isOver ? 'bg-zinc-200 border-zinc-500' : 'bg-zinc-100 border-zinc-300'
              }`}
            >
              <header className="px-4 py-3 border-b border-zinc-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-900">{stage.name}</h3>
                  <span className="text-xs font-medium text-zinc-500 bg-white border border-zinc-300 rounded-md px-1.5 py-0.5">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{formatMoney(stageTotal)}</p>
              </header>

              <div className="p-3 flex flex-col gap-3 min-h-24">
                {stageDeals.map((deal) => {
                  const client = clientsById.get(deal.clientId);
                  return (
                    <article
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                      onDragEnd={resetDrag}
                      className={`bg-white border border-zinc-300 rounded-lg p-3 shadow-sm cursor-grab active:cursor-grabbing ${
                        draggingId === deal.id ? 'opacity-40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-zinc-900">{deal.title}</p>
                        <div className="flex shrink-0 -mr-1 -mt-1">
                          <button onClick={() => openEdit(deal)} title="Редагувати" className="p-1 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-md">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(deal)} title="Видалити" className="p-1 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-500 mt-1">
                        {client ? client.name : 'Клієнта видалено'}
                        {client?.company ? ` · ${client.company}` : ''}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-semibold text-zinc-900">{formatMoney(deal.amount)}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium border rounded-md ${statusStyles[deal.status]}`}>
                          {DEAL_STATUS_LABELS[deal.status]}
                        </span>
                      </div>
                    </article>
                  );
                })}

                {stageDeals.length === 0 && (
                  <p className="text-xs text-zinc-400 text-center py-4">Немає угод</p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {isModalOpen && <DealModal deal={editing} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
