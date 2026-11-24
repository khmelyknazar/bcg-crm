import { LayoutDashboard, Users, Handshake, Package, ClipboardList, MessageCircle, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

// Єдине місце, де описані всі розділи: його читають і сайдбар, і шапка
export const navItems: NavItem[] = [
  { path: '/analytics', label: 'Аналітика', icon: LayoutDashboard },
  { path: '/clients', label: 'Клієнти', icon: Users },
  { path: '/deals', label: 'Угоди', icon: Handshake },
  { path: '/services', label: 'Послуги', icon: Package },
  { path: '/tasks', label: 'Завдання', icon: ClipboardList },
  { path: '/chats', label: 'Чати', icon: MessageCircle },
  { path: '/settings', label: 'Налаштування', icon: Settings },
];
