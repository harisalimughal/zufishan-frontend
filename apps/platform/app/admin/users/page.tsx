"use client";

import { useEffect, useState } from "react";
import { UserList } from "@/features/admin/UserList";
import { adminService, AdminUser } from "@/services/adminService";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    adminService
      .getUsers()
      .then(setUsers)
      .catch((err) => setError(err?.message || "Failed to load users"))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      await adminService.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <p className="mt-2 text-slate-400">Manage all platform users</p>
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-[#27272A] bg-black px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#27272A] bg-[#111827] p-4">
          <p className="text-sm text-slate-400">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="rounded-xl border border-[#27272A] bg-[#111827] p-4">
          <p className="text-sm text-slate-400">Students</p>
          <p className="mt-1 text-2xl font-bold text-emerald-400">
            {users.filter((u) => u.role === "STUDENT").length}
          </p>
        </div>
        <div className="rounded-xl border border-[#27272A] bg-[#111827] p-4">
          <p className="text-sm text-slate-400">Admins</p>
          <p className="mt-1 text-2xl font-bold text-purple-400">
            {users.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {isLoading ? (
        <p className="text-slate-400">Loading users…</p>
      ) : (
        <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
      )}
    </div>
  );
}
