import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/crm-context';
import type { Task, TaskFormData } from '../../types/task';
import { today } from '../../utils/format';

interface TaskModalProps {
  task: Task | null; // null = нове завдання
  onSave: (data: TaskFormData) => void;
  onClose: () => void;
}

const inputClass =
  'w-full h-10 px-3 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200';

export const TaskModal: FC<TaskModalProps> = ({ task, onSave, onClose }) => {
  const { clients } = useCrm();

  const [title, setTitle] = useState(task?.title ?? '');
  const [clientId, setClientId] = useState(task ? String(task.clientId) : '');
  const [dueDate, setDueDate] = useState(task?.dueDate ?? today());
  const [done, setDone] = useState(task?.done ?? false);
  const [errors, setErrors] = useState<Partial<Record<'title' | 'clientId' | 'dueDate', string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};

    if (!title.trim()) next.title = 'Вкажіть назву завдання';
    if (!clientId) next.clientId = 'Оберіть клієнта';
    if (!dueDate) next.dueDate = 'Вкажіть строк';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      title: title.trim(),
      done,
      dueDate,
      clientId: Number(clientId),
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
          <h3 className="font-semibold text-zinc-900">{task ? 'Редагувати завдання' : 'Нове завдання'}</h3>
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
            <Select className="mt-1" value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Оберіть клієнта</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}{c.company ? `, ${c.company}` : ''}
                </option>
              ))}
            </Select>
            {errors.clientId && <span className="text-xs text-red-600">{errors.clientId}</span>}
          </label>

          <label className="text-sm font-medium text-zinc-700">
            Строк *
            <input
              type="date"
              className={`${inputClass} mt-1`}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            {errors.dueDate && <span className="text-xs text-red-600">{errors.dueDate}</span>}
          </label>

          <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer">
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
              className="w-4 h-4 accent-zinc-900 rounded border-zinc-300"
            />
            Виконано
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
