import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Service, ServiceFormData } from '../../types/service';

interface ServiceModalProps {
  service: Service | null; // null = нова послуга
  onSave: (data: ServiceFormData) => void;
  onClose: () => void;
}

const inputClass =
  'w-full h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200';

export const ServiceModal: FC<ServiceModalProps> = ({ service, onSave, onClose }) => {
  const [name, setName] = useState(service?.name ?? '');
  const [price, setPrice] = useState(service ? String(service.price) : '');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'price', string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    const priceNumber = Number(price);

    if (!name.trim()) next.name = 'Вкажіть назву послуги';
    if (price === '' || Number.isNaN(priceNumber) || priceNumber < 0) next.price = 'Вкажіть коректну ціну';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({ name: name.trim(), price: priceNumber });
  };

  return (
    <div className="fixed inset-0 z-30 bg-zinc-900/40 flex items-center justify-center p-4" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border border-zinc-300 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-zinc-200">
          <h3 className="font-semibold text-zinc-900">{service ? 'Редагувати послугу' : 'Нова послуга'}</h3>
          <button type="button" onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700">
            Назва *
            <input className={`${inputClass} mt-1`} value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Ціна, ₴ *
            <input
              type="number"
              min="0"
              className={`${inputClass} mt-1`}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <span className="text-xs text-red-600">{errors.price}</span>}
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
