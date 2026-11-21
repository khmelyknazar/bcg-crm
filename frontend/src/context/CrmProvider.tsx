import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { CrmContext } from './crm-context';
import type { LoadStatus } from './crm-context';
import { clientsApi, dealsApi, getErrorMessage, stagesApi, tasksApi } from '../api';
import { initialServices } from '../data/services';
import type { Client } from '../types/client';
import type { Deal, Stage } from '../types/deal';
import type { Task } from '../types/task';
import type { Service } from '../types/service';

// Тут живуть дані. Клієнти, угоди, завдання та етапи приходять з API, послуги поки тестові.
export function CrmProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  // Послуги: на бекенді розділ ще не готовий, тому беремо тестові дані
  const [services, setServices] = useState<Service[]>(initialServices);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  // Завантажує все з сервера. Викликається при старті, повторі після помилки та для відкату змін.
  const reload = useCallback(async () => {
    try {
      const [clientsData, dealsData, tasksData, stagesData] = await Promise.all([
        clientsApi.list(),
        dealsApi.list(),
        tasksApi.list(),
        stagesApi.list(),
      ]);
      setClients(clientsData);
      setDeals(dealsData);
      setTasks(tasksData);
      setStages([...stagesData].sort((a, b) => a.position - b.position));
      setError(null);
      setStatus('ready');
    } catch (e) {
      setError(getErrorMessage(e));
      setStatus('error');
    }
  }, []);

  const retry = useCallback(() => {
    setStatus('loading');
    void reload();
  }, [reload]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <CrmContext.Provider
      value={{
        clients, setClients,
        deals, setDeals,
        stages,
        tasks, setTasks,
        services, setServices,
        status, error, reload, retry,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
}
