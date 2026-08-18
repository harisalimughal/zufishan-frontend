// apps/admin/app/page.tsx
import { AdminDashboard } from '@/components/AdminDashboard';
import { getUserStats } from '../mock-data/users';

export default function AdminPage() {
  const stats = getUserStats();

  return <AdminDashboard stats={stats} />;
}
