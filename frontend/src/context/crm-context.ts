import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Client } from '../types/client';
import type { Deal, Stage } from '../types/deal';
import type { Task } from '../types/task';

// Спільні дані CRM: їх читають і змінюють різні сторінки
export interface CrmContextValue {
  clients: Client[];
  setClients: Dispatch<SetStateAction<Client[]>>;
  deals: Deal[];
  setDeals: Dispatch<SetStateAction<Deal[]>>;
  stages: Stage[];
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export const CrmContext = createContext<CrmContextValue | null>(null);

export function useCrm(): CrmContextValue {
  const ctx = useContext(CrmContext);
  if (!ctx) throw new Error('useCrm потрібно викликати всередині CrmProvider');
  return ctx;
}
