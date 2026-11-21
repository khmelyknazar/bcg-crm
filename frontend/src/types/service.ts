// Відповідає моделі Product на бекенді
export interface Service {
  id: number;
  name: string;
  price: number;
}

export type ServiceFormData = Omit<Service, 'id'>;
