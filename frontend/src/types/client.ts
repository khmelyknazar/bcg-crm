export type ClientStatus = 'lead' | 'active' | 'inactive';

export interface Client {
  id: number;
  name: string;
  company: string;
  edrpou: string; // ЄДРПОУ (8 цифр) або РНОКПП для ФОП (10 цифр)
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
