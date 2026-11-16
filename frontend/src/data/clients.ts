import type { Client } from '../types/client';

// Тестові дані. Коли буде готовий бекенд, цей файл замінимо запитом до API.
export const initialClients: Client[] = [
  { id: '1', name: 'Олександр Коваленко', company: 'ТОВ "Меридіан"', email: 'o.kovalenko@meridian.ua', phone: '+380 50 123 45 67', status: 'active', createdAt: '2026-09-02' },
  { id: '2', name: 'Ірина Шевченко', company: 'Аргус Груп', email: 'i.shevchenko@argus.com', phone: '+380 67 234 56 78', status: 'lead', createdAt: '2026-09-15' },
  { id: '3', name: 'Дмитро Бондаренко', company: 'ФОП Бондаренко', email: 'd.bondarenko@gmail.com', phone: '+380 63 345 67 89', status: 'active', createdAt: '2026-09-21' },
  { id: '4', name: 'Марія Ткаченко', company: 'Логістик Плюс', email: 'm.tkachenko@logplus.ua', phone: '+380 93 456 78 90', status: 'inactive', createdAt: '2026-08-11' },
  { id: '5', name: 'Андрій Мельник', company: 'ТОВ "Побутсервіс"', email: 'a.melnyk@pobut.ua', phone: '+380 97 567 89 01', status: 'lead', createdAt: '2026-10-03' },
  { id: '6', name: 'Наталія Кравченко', company: 'Вектор', email: 'n.kravchenko@vector.ua', phone: '+380 50 678 90 12', status: 'active', createdAt: '2026-10-18' },
  { id: '7', name: 'Сергій Олійник', company: 'Техно-Строй', email: 's.oliynyk@tehno.ua', phone: '+380 66 789 01 23', status: 'inactive', createdAt: '2026-07-25' },
  { id: '8', name: 'Оксана Гончар', company: 'Едельвейс', email: 'o.gonchar@edelweiss.ua', phone: '+380 68 890 12 34', status: 'active', createdAt: '2026-11-01' },
];
