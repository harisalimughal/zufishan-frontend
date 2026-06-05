// apps/admin/types/index.ts
import { User, UserStats, UserFilter } from '@nexora/types';

export type { User, UserStats, UserFilter };

export interface AdminContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AdminRouteConfig {
  path: string;
  label: string;
  icon: string;
  requiredRole?: 'admin';
}
