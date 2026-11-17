import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useCrm } from '../../context/crm-context';
import { DEAL_STATUS_LABELS } from '../../types/deal';
import type { Deal, DealFormData, DealStatus } from '../../types/deal';

interface DealModalProps {
  deal: Deal | null; // null = нова угода
  onSave: (data: DealFormData) => void;
  onClose: () => void;
}

const inputClass =
  'w-full h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200';

export const DealModal: FC<DealModalProps> = ({ deal, onSave, onClose }) => {
  const { clients, stages } = useCrm();

  // Поля форми зберігаємо як рядки, а в числа перетворюємо при збереженні
  const [title, setTitle] = useState(deal?.title ?? '');
  const [amount, setAmount] = useState(deal ? String(deal.amount) : '');
  const [clientId, setClientId] = useState(deal ? String(deal.clientId) : '');
  const [stageId, setStageId] = useState(String(deal?.stageId ?? stages[0]?.id ?? ''));
  const [status, setStatus] = useState<DealStatus>(deal?.status ?? 'OPEN');
  const [errors, setErrors] = useState<Partial<Record<'title' | 'amount' | 'clientId', string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const amountNumber = Number(amount);

    if (!title.trim()) next.title = 'Вкажіть назву угоди';
    if (!clientId) next.clientId = 'Оберіть клієнта';
    if (amount === '' || Number.isNaN(amountNumber) || amountNumber < 0) next.amount = 'Вкажіть коректну суму';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      title: title.trim(),
      amount: amountNumber,
      status,
      clientId: Number(clientId),
      stageId: Number(stageId),
    });
  };

  return (
    <div className="fixed inset-0 z-30 bg-zinc-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border border-zinc-300 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-zinc-200">
          <h3 className="font-semibold text-zinc-900">{deal ? 'Редагувати угоду' : 'Нова угода'}</h3>
          <button type="button" onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700">
            Назва *
            <input className={`${inputClass} mt-1`} value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="text-xs text-red-600">{errors.title}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Клієнт *
            <select className={`${inputClass} mt-1`} value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Оберіть клієнта</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}{c.company ? `, ${c.company}` : ''}
                </option>
              ))}
            </select>
            {errors.clientId && <span className="text-xs text-red-600">{errors.clientId}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Сума, ₴ *
            <input
              type="number"
              min="0"
              className={`${inputClass} mt-1`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <span className="text-xs text-red-600">{errors.amount}</span>}
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm font-medium text-zinc-700">
              Етап
              <select className={`${inputClass} mt-1`} value={stageId} onChange={(e) => setStageId(e.target.value)}>
                {stages.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-zinc-700">
              Статус
              <select
                className={`${inputClass} mt-1`}
                value={status}
                onChange={(e) => setStatus(e.target.value as DealStatus)}
              >
                {(Object.keys(DEAL_STATUS_LABELS) as DealStatus[]).map((s) => (
                  <option key={s} value={s}>{DEAL_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-5 h-16 items-center border-t border-zinc-200">
          <button type="button" onClick={onClose} className="h-9 px-4 text-sm font-medium text-zinc-700 border border-zinc-300 rounded-lg hover:bg-zinc-50">
            Скасувати
          </button>
          <button type="submit" className="h-9 px-4 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800">
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
};
