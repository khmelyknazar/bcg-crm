import { request } from './http';
import type { AuthUser, UserRole } from '../types/auth';
import type { Client, ClientFormData, ClientStatus } from '../types/client';
import type { Deal, DealFormData, DealStatus, Stage } from '../types/deal';
import type { Task, TaskFormData } from '../types/task';

export { ApiError, getErrorMessage } from './http';

// Бекенд віддає дати як ISO-рядки (2026-11-14T15:13:23.000Z), а в таблицях потрібні лише 10 символів
const toDate = (iso: string) => iso.slice(0, 10);

// Те, що повертає бекенд (необов'язкові поля там можуть бути null)
interface RawClient {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  edrpou: string | null;
  status: ClientStatus;
  createdAt: string;
}

interface RawDeal {
  id: number;
  title: string;
  amount: number;
  status: DealStatus;
  clientId: number;
  stageId: number;
  createdAt: string;
  closedAt: string | null;
}

interface RawTask {
  id: number;
  title: string;
  done: boolean;
  dueDate: string | null;
  clientId: number | null;
}

// Перетворюємо відповідь бекенду у наші типи
const toClient = (r: RawClient): Client => ({
  id: r.id,
  name: r.name,
  company: r.company ?? '',
  edrpou: r.edrpou ?? '',
  email: r.email ?? '',
  phone: r.phone ?? '',
  status: r.status,
  createdAt: toDate(r.createdAt),
});

const toDeal = (r: RawDeal): Deal => ({
  id: r.id,
  title: r.title,
  amount: r.amount,
  status: r.status,
  clientId: r.clientId,
  stageId: r.stageId,
  createdAt: toDate(r.createdAt),
  closedAt: r.closedAt ? toDate(r.closedAt) : null,
});

const toTask = (r: RawTask): Task => ({
  id: r.id,
  title: r.title,
  done: r.done,
  dueDate: r.dueDate ? toDate(r.dueDate) : '',
  clientId: r.clientId ?? 0,
});

export const clientsApi = {
  list: async () => (await request<RawClient[]>('/clients')).map(toClient),
  create: async (data: ClientFormData) =>
    toClient(await request<RawClient>('/clients', { method: 'POST', body: data })),
  update: async (id: number, data: Partial<ClientFormData>) =>
    toClient(await request<RawClient>(`/clients/${id}`, { method: 'PATCH', body: data })),
  remove: (id: number) => request<unknown>(`/clients/${id}`, { method: 'DELETE' }),
};

export const dealsApi = {
  list: async () => (await request<RawDeal[]>('/deals')).map(toDeal),
  create: async (data: DealFormData) =>
    toDeal(await request<RawDeal>('/deals', { method: 'POST', body: data })),
  update: async (id: number, data: Partial<DealFormData>) =>
    toDeal(await request<RawDeal>(`/deals/${id}`, { method: 'PATCH', body: data })),
  remove: (id: number) => request<unknown>(`/deals/${id}`, { method: 'DELETE' }),
};

export const tasksApi = {
  list: async () => (await request<RawTask[]>('/tasks')).map(toTask),
  create: async (data: TaskFormData) =>
    toTask(await request<RawTask>('/tasks', { method: 'POST', body: data })),
  update: async (id: number, data: Partial<TaskFormData>) =>
    toTask(await request<RawTask>(`/tasks/${id}`, { method: 'PATCH', body: data })),
  remove: (id: number) => request<unknown>(`/tasks/${id}`, { method: 'DELETE' }),
};

export const stagesApi = {
  list: () => request<Stage[]>('/stages'),
};

// Для сторінки аналітики
export interface AnalyticsSummary {
  clients: number;
  openDeals: number;
  openAmount: number;
  wonDeals: number;
  revenue: number;
  lostDeals: number;
  conversion: number;
  overdueTasks: number;
}

export interface FunnelItem {
  stageId: number;
  stage: string;
  deals: number;
  amount: number;
}

export const analyticsApi = {
  summary: () => request<AnalyticsSummary>('/analytics/summary'),
  funnel: () => request<FunnelItem[]>('/analytics/funnel'),
};

// Для розділу налаштувань (керування ролями)
export const usersApi = {
  list: () => request<AuthUser[]>('/users'),
  setRole: (id: number, role: UserRole) =>
    request<AuthUser>(`/users/${id}/role`, { method: 'PATCH', body: { role } }),
};

export const authApi = {
  // auth: false — для логіну токен ще не потрібен, а 401 означає "невірний пароль", а не вихід із системи
  login: (email: string, password: string) =>
    request<{ accessToken: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: { email, password },
      auth: false,
    }),
  me: () => request<AuthUser>('/auth/me'),
};
