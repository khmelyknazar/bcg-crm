import type { Task } from '../types/task';

// Тестові дані. Коли буде готовий бекенд, цей файл замінимо запитом до API.
export const initialTasks: Task[] = [
  { id: 1, title: 'Зателефонувати щодо договору', done: false, dueDate: '2026-11-18', clientId: 1 },
  { id: 2, title: 'Надіслати комерційну пропозицію', done: false, dueDate: '2026-11-15', clientId: 2 },
  { id: 3, title: 'Узгодити акт виконаних робіт', done: true, dueDate: '2026-11-10', clientId: 3 },
  { id: 4, title: 'Підготувати презентацію логістики', done: false, dueDate: '2026-11-20', clientId: 4 },
  { id: 5, title: 'Уточнити вимоги до порталу', done: false, dueDate: '2026-11-17', clientId: 5 },
  { id: 6, title: 'Погодити етапи мобільного застосунку', done: false, dueDate: '2026-11-25', clientId: 6 },
  { id: 7, title: 'Надіслати рахунок за навчання', done: true, dueDate: '2026-11-12', clientId: 8 },
];
