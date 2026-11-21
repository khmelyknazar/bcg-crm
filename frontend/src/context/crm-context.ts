import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Client } from '../types/client';
import type { Deal, Stage } from '../types/deal';
import type { Task } from '../types/task';
import type { Service } from '../types/service';

export type LoadStatus = 'loading' | 'ready' | 'error';

// Спільні дані CRM: їх читають і змінюють різні сторінки
export interface CrmContextValue {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  deals: Deal[];
  setDeals: Dispatch<SetStateAction<Deal[]>>;
  stages: Stage[];
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  services: Service[];
  setServices: Dispatch<SetStateAction<Service[]>>;
  status: LoadStatus;
  error: string | null;
  reload: () => Promise<void>;
  retry: () => void;
}

export const CrmContext = createContext<CrmContextValue | null>(null);

export function useCrm(): CrmContextValue {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error('useCrm потрібно викликати всередині CrmProvider');
  return ctx;
}
