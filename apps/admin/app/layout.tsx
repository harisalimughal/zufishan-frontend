// apps/admin/app/layout.tsx
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import '../globals.css';

export const metadata = {
  title: 'Nexora Admin Panel',
  description: 'Administration dashboard for Nexora platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          <AdminSidebar />
          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
