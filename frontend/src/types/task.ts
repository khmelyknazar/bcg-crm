export interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate: string; // YYYY-MM-DD
  clientId: number;
}

export type TaskFormData = Omit<Task, 'id'>;

export type TaskFilter = 'all' | 'open' | 'done' | 'overdue';

export const TASK_FILTER_LABELS: Record<TaskFilter, string> = {
  all: 'Усі',
  open: 'Відкриті',
  done: 'Виконані',
  overdue: 'Прострочені',
};
