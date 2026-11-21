import type { Deal, Stage } from '../types/deal';

// Тестові дані у форматі, який відповідає схемі бекенду (Stage, Deal)
export const initialStages: Stage[] = [
  { id: 1, name: 'Нова', position: 1 },
  { id: 2, name: 'Переговори', position: 2 },
  { id: 3, name: 'Пропозиція', position: 3 },
  { id: 4, name: 'Договір', position: 4 },
];

export const initialDeals: Deal[] = [
  { id: 1, title: 'Розробка сайту', amount: 85000, status: 'OPEN', clientId: 1, stageId: 2, createdAt: '2026-10-02', closedAt: null },
  { id: 2, title: 'Підтримка CRM, річний пакет', amount: 36000, status: 'OPEN', clientId: 2, stageId: 1, createdAt: '2026-11-03', closedAt: null },
  { id: 3, title: 'Консалтинг з логістики', amount: 120000, status: 'OPEN', clientId: 4, stageId: 3, createdAt: '2026-10-14', closedAt: null },
  { id: 4, title: 'Інтеграція з обліковою системою', amount: 54000, status: 'WON', clientId: 3, stageId: 4, createdAt: '2026-09-25', closedAt: '2026-10-20' },
  { id: 5, title: 'Мобільний застосунок', amount: 210000, status: 'OPEN', clientId: 6, stageId: 3, createdAt: '2026-10-22', closedAt: null },
  { id: 6, title: 'Аудит безпеки', amount: 28000, status: 'LOST', clientId: 7, stageId: 2, createdAt: '2026-09-18', closedAt: '2026-10-05' },
  { id: 7, title: 'Навчання персоналу', amount: 15000, status: 'OPEN', clientId: 8, stageId: 1, createdAt: '2026-11-10', closedAt: null },
  { id: 8, title: 'Редизайн корпоративного порталу', amount: 97000, status: 'OPEN', clientId: 5, stageId: 2, createdAt: '2026-11-01', closedAt: null },
  { id: 9, title: 'Розширення ліцензій', amount: 42000, status: 'WON', clientId: 1, stageId: 4, createdAt: '2026-10-28', closedAt: '2026-11-05' },
];
