import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';
import { getErrorMessage, usersApi } from '../../api';
import { useAuth } from '../../context/auth-context';
import { ROLE_LABELS } from '../../types/auth';
import type { AuthUser, UserRole } from '../../types/auth';
import { Select } from '../ui/Select';
import { ErrorBanner } from '../ui/ErrorBanner';

export function SettingsPage() {
  const { user, logout } = useAuth();
  const isOwner = user?.role === 'OWNER';

  const [users, setUsers] = useState<AuthUser[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOwner) return;
    let cancelled = false;
    usersApi
      .list()
      .then((list) => {
        if (!cancelled) setUsers(list);
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e));
      });
    return () => {
      cancelled = true;
    };
  }, [isOwner]);

  const changeRole = async (id: number, role: UserRole) => {
    try {
      const updated = await usersApi.setRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u)));
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-3xl">
      {error && <ErrorBanner message={error} onClose={() => setError('')} />}

      <div className="p-5 bg-white border border-zinc-300 shadow-sm rounded-xl">
        <h2 className="font-medium text-zinc-900">Профіль</h2>
        <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-3 text-sm">
          <dt className="text-zinc-500">Імʼя</dt>
          <dd className="text-zinc-900">{user.name}</dd>
          <dt className="text-zinc-500">Email</dt>
          <dd className="text-zinc-900">{user.email}</dd>
          <dt className="text-zinc-500">Роль</dt>
          <dd className="text-zinc-900">{ROLE_LABELS[user.role]}</dd>
        </dl>
        <button
          onClick={logout}
          className="mt-5 h-9 px-4 inline-flex items-center gap-2 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800"
        >
          <LogOut className="w-4 h-4" />
          Вийти
        </button>
      </div>

      {isOwner && (
        <div className="bg-white border border-zinc-300 shadow-sm rounded-xl overflow-hidden">
          <div className="p-5 border-b border-zinc-300">
            <h2 className="font-medium text-zinc-900">Користувачі та ролі</h2>
            <p className="text-sm text-zinc-500">Лише власник може змінювати ролі.</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-300">
                <th className="px-5 py-3 font-medium">Імʼя</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium w-44">Роль</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-zinc-200 last:border-0">
                  <td className="px-5 py-3 text-zinc-900">{u.name}</td>
                  <td className="px-5 py-3 text-zinc-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <Select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value as UserRole)}
                    >
                      <option value="OWNER">{ROLE_LABELS.OWNER}</option>
                      <option value="MANAGER">{ROLE_LABELS.MANAGER}</option>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
