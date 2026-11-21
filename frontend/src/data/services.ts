import type { Service } from '../types/service';

// Тестові дані. Коли буде готовий бекенд, цей файл замінимо запитом до API.
export const initialServices: Service[] = [
  { id: 1, name: 'Розробка веб-сайту', price: 60000 },
  { id: 2, name: 'Мобільний застосунок', price: 180000 },
  { id: 3, name: 'Технічна підтримка (місяць)', price: 8000 },
  { id: 4, name: 'Аудит безпеки', price: 28000 },
  { id: 5, name: 'Інтеграція з обліковою системою', price: 45000 },
  { id: 6, name: 'Навчання персоналу', price: 15000 },
  { id: 7, name: 'Консультація (година)', price: 1500 },
];
