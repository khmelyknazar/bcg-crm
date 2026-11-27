import { useCallback, useEffect, useState } from 'react';
import { analyticsApi, getErrorMessage } from '../../api';
import type { AnalyticsSummary, FunnelItem } from '../../api';
import { formatMoney } from '../../utils/format';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
}

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="p-5 bg-white border border-zinc-300 shadow-sm rounded-xl">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [funnel, setFunnel] = useState<FunnelItem[]>([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const [s, f] = await Promise.all([analyticsApi.summary(), analyticsApi.funnel()]);
      setSummary(s);
      setFunnel(f);
      setError('');
    } catch (e) {
      setError(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return (
      <div className="p-8 bg-white border border-zinc-300 shadow-sm rounded-xl text-center">
        <p className="font-medium text-zinc-900">Не вдалося завантажити аналітику</p>
        <p className="mt-1 text-sm text-zinc-500">{error}</p>
        <button
          onClick={load}
          className="mt-4 h-9 px-4 text-sm font-medium text-white bg-zinc-900 rounded-lg hover:bg-zinc-800"
        >
          Спробувати ще раз
        </button>
      </div>
    );
  }

  if (!summary) return <p className="text-sm text-zinc-500">Завантаження...</p>;

  const maxAmount = Math.max(1, ...funnel.map((f) => f.amount));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard label="Клієнти" value={String(summary.clients)} />
        <StatCard
          label="Відкриті угоди"
          value={String(summary.openDeals)}
          hint={`На суму ${formatMoney(summary.openAmount)}`}
        />
        <StatCard
          label="Виручка"
          value={formatMoney(summary.revenue)}
          hint={`Виграно угод: ${summary.wonDeals}`}
        />
        <StatCard label="Конверсія" value={`${summary.conversion}%`} hint="Частка виграних угод серед закритих" />
        <StatCard label="Програні угоди" value={String(summary.lostDeals)} />
        <StatCard label="Прострочені завдання" value={String(summary.overdueTasks)} />
      </div>

      <div className="p-5 bg-white border border-zinc-300 shadow-sm rounded-xl">
        <h2 className="font-medium text-zinc-900">Воронка продажів</h2>
        <p className="text-sm text-zinc-500">Відкриті угоди за етапами</p>

        <div className="mt-5 space-y-4">
          {funnel.length === 0 && <p className="text-sm text-zinc-500">Поки що немає даних.</p>}
          {funnel.map((item) => (
            <div key={item.stageId}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-zinc-900">{item.stage}</span>
                <span className="text-zinc-500">
                  {item.deals} шт. · {formatMoney(item.amount)}
                </span>
              </div>
              <div className="mt-1.5 h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-zinc-900 rounded-full"
                  style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
