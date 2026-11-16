import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { X } from 'lucide-react';
import { STATUS_LABELS } from '../../types/client';
import type { Client, ClientFormData, ClientStatus } from '../../types/client';

interface ClientModalProps {
  client: Client | null; // null = створюємо нового, інакше редагуємо
  onSave: (data: ClientFormData) => void;
  onClose: () => void;
}

const emptyForm: ClientFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  status: 'lead',
};

const inputClass =
  'w-full h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200';

export const ClientModal: FC<ClientModalProps> = ({ client, onSave, onClose }) => {
  const [form, setForm] = useState<ClientFormData>(
    client
      ? { name: client.name, company: client.company, email: client.email, phone: client.phone, status: client.status }
      : emptyForm
  );
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});

  const update = <K extends keyof ClientFormData>(key: K, value: ClientFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Вкажіть ім'я";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Некоректний email';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // щоб сторінка не перезавантажувалась
    if (validate()) onSave(form);
  };

  return (
    <div className="fixed inset-0 z-30 bg-zinc-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} // клік усередині вікна не закриває його
        className="w-full max-w-md bg-white border border-zinc-300 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-zinc-200">
          <h3 className="font-semibold text-zinc-900">{client ? 'Редагувати клієнта' : 'Новий клієнт'}</h3>
          <button type="button" onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700">
            Ім'я *
            <input className={`${inputClass} mt-1`} value={form.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Компанія
            <input className={`${inputClass} mt-1`} value={form.company} onChange={(e) => update('company', e.target.value)} />
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Email *
            <input className={`${inputClass} mt-1`} value={form.email} onChange={(e) => update('email', e.target.value)} />
            {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Телефон
            <input className={`${inputClass} mt-1`} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Статус
            <select
              className={`${inputClass} mt-1`}
              value={form.status}
              onChange={(e) => update('status', e.target.value as ClientStatus)}
            >
              {(Object.keys(STATUS_LABELS) as ClientStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </label>
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
