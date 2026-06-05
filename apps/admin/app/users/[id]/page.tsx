// apps/admin/app/users/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { UserProfile } from '@/components/users/UserProfile';
import { mockUsers } from '../../../mock-data/users';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const user = mockUsers.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">User not found</p>
        <Link href="/users" className="text-blue-600 hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/users"
            className="text-blue-600 hover:underline text-sm mb-2 inline-block"
          >
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>
        <div className="space-x-2">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition">
            Edit
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition">
            Deactivate
          </button>
        </div>
      </div>

      {/* User Profile */}
      <UserProfile user={user} />
    </div>
  );
}
