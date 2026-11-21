import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Select } from '../ui/Select';
import { useCrm } from '../../context/crm-context';
import { TASK_FILTER_LABELS } from '../../types/task';
import type { Task, TaskFilter, TaskFormData } from '../../types/task';
import { formatDate, today } from '../../utils/format';
import { TaskModal } from './TaskModal';

const isOverdue = (task: Task, now: string) => !task.done && task.dueDate < now;

export const TasksPage: FC = () => {
  const { clients, tasks, setTasks } = useCrm();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const clientsById = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);
  const now = today();

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((task) => {
        const client = clientsById.get(task.clientId);
        const matchesQuery =
          !q ||
          task.title.toLowerCase().includes(q) ||
          (client?.name.toLowerCase().includes(q) ?? false) ||
          (client?.company.toLowerCase().includes(q) ?? false);
        const matchesFilter =
          filter === 'all' ||
          (filter === 'open' && !task.done) ||
          (filter === 'done' && task.done) ||
          (filter === 'overdue' && isOverdue(task, now));
        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [tasks, clientsById, query, filter, now]);

  const openCount = tasks.filter((t) => !t.done).length;

  const openCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setIsModalOpen(true);
  };

  const handleSave = (data: TaskFormData) => {
    if (editing) {
      setTasks((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
    } else {
      const newTask: Task = {
        ...data,
        id: tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (task: Task) => {
    if (window.confirm(`Видалити завдання "${task.title}"?`)) {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  const toggleDone = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="bg-white border border-zinc-300 rounded-xl shadow-sm">
      <div className="flex flex-wrap items-center gap-3 p-4 border-b border-zinc-200">
        <div className="relative flex-1 min-w-56 max-w-sm">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук за назвою або клієнтом..."
            className="w-full h-10 pl-9 pr-3 bg-white border border-zinc-300 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <Select value={filter} onChange={(e) => setFilter(e.target.value as TaskFilter)}>
          {(Object.keys(TASK_FILTER_LABELS) as TaskFilter[]).map((key) => (
            <option key={key} value={key}>{TASK_FILTER_LABELS[key]}</option>
          ))}
        </Select>

        <p className="text-sm text-zinc-500 ml-2">
          Відкрито: <span className="font-semibold text-zinc-900">{openCount}</span>
        </p>

        <button
          onClick={openCreate}
          className="ml-auto h-10 px-4 inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Додати завдання
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 bg-zinc-50 border-b border-zinc-200">
              <th className="px-4 py-3 w-12">
                <span className="sr-only">Виконано</span>
              </th>
              <th className="px-4 py-3">Завдання</th>
              <th className="px-4 py-3">Клієнт</th>
              <th className="px-4 py-3">Строк</th>
              <th className="px-4 py-3 w-24" />
            </tr>
          </thead>
          <tbody>
            {visibleTasks.map((task) => {
              const client = clientsById.get(task.clientId);
              const overdue = isOverdue(task, now);
              return (
                <tr key={task.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task)}
                      title={task.done ? 'Позначити як невиконане' : 'Позначити як виконане'}
                      className="w-4 h-4 accent-zinc-900 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className={`font-medium ${task.done ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>
                      {task.title}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-800">{client ? client.name : 'Клієнта видалено'}</p>
                    {client?.company && <p className="text-xs text-zinc-500">{client.company}</p>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={overdue ? 'font-medium text-red-600' : task.done ? 'text-zinc-400' : 'text-zinc-700'}>
                      {formatDate(task.dueDate)}
                    </span>
                    {overdue && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md">
                        Прострочено
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(task)} title="Редагувати" className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(task)} title="Видалити" className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {visibleTasks.length === 0 && (
          <p className="py-12 text-center text-sm text-zinc-500">Нічого не знайдено</p>
        )}
      </div>

      <div className="px-4 py-3 border-t border-zinc-200 text-xs text-zinc-500">
        Показано {visibleTasks.length} з {tasks.length}
      </div>

      {isModalOpen && (
        <TaskModal task={editing} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
