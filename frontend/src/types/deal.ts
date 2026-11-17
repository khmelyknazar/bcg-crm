export type DealStatus = 'OPEN' | 'WON' | 'LOST';

// Етап воронки (колонка на дошці)
export interface Stage {
  id: number;
  name: string;
  position: number;
}

export interface Deal {
  id: number;
  title: string;
  amount: number;
  status: DealStatus;
  clientId: number;
  stageId: number;
  createdAt: string; // YYYY-MM-DD
  closedAt: string | null;
}

export type DealFormData = Omit<Deal, 'id' | 'createdAt' | 'closedAt'>;

export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
  OPEN: 'Відкрита',
  WON: 'Виграна',
  LOST: 'Програна',
};
