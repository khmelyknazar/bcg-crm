import { useState } from 'react';
import type { ReactNode } from 'react';
import { CrmContext } from './crm-context';
import { initialClients } from '../data/clients';
import { initialDeals, initialStages } from '../data/deals';
import type { Client } from '../types/client';
import type { Deal } from '../types/deal';

// Тут живуть дані. Коли буде бекенд, початкові значення замінимо запитами до API.
export function CrmProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const stages = [...initialStages].sort((a, b) => a.position - b.position);

  return (
    <CrmContext.Provider value={{ clients, setClients, deals, setDeals, stages }}>
      {children}
    </CrmContext.Provider>
  );
}
