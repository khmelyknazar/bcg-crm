export type UserRole = 'OWNER' | 'MANAGER';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  OWNER: 'Власник',
  MANAGER: 'Менеджер',
};
