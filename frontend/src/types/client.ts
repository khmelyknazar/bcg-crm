export type ClientStatus = 'lead' | 'active' | 'inactive';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  createdAt: string; // формат YYYY-MM-DD
}

// Дані для форми: усе, крім id та дати створення (їх задаємо ми, а не користувач)
export type ClientFormData = Omit<Client, 'id' | 'createdAt'>;

export const STATUS_LABELS: Record<ClientStatus, string> = {
  lead: 'Потенційний',
  active: 'Активний',
  inactive: 'Неактивний',
};
