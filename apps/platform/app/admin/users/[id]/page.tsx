"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UserProfile } from "@/features/admin/UserProfile";
import { adminService, AdminUser } from "@/services/adminService";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .getUser(userId)
      .then(setUser)
      .catch((err) => setError(err?.message || "User not found"))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(userId);
      router.replace("/admin/users");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  if (isLoading) {
    return <p className="text-slate-400">Loading…</p>;
  }

  if (error || !user) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-slate-400">{error || "User not found"}</p>
        <Link href="/admin/users" className="text-[#3B82F6] hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/users"
            className="mb-2 inline-block text-sm text-[#3B82F6] hover:underline"
          >
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-white">User Details</h1>
        </div>
        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
        >
          Delete User
        </button>
      </div>

      <UserProfile user={user} />
    </div>
  );
}
