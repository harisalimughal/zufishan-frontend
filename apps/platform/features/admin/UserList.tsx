"use client";

import Link from "next/link";
import { AdminUser } from "@/services/adminService";

interface UserListProps {
  users: AdminUser[];
  onDeleteUser?: (userId: string) => void;
}

function getUserInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.charAt(0) ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${last}`.toUpperCase();
}

function getRoleBadgeColor(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-purple-500/20 text-purple-300";
    case "TUTOR":
      return "bg-[#3B82F6]/20 text-[#3B82F6]";
    case "STUDENT":
      return "bg-emerald-500/20 text-emerald-400";
    default:
      return "bg-slate-500/20 text-slate-300";
  }
}

export function UserList({ users, onDeleteUser }: UserListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#27272A] bg-[#111827]">
      <table className="w-full">
        <thead className="border-b border-[#27272A]">
          <tr>
            {["Name", "Email", "Role", "Joined", "Actions"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#27272A]">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-[#1F2937]">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="mr-3 h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6] text-xs font-semibold text-white">
                      {getUserInitials(user.fullName)}
                    </div>
                  )}
                  <span className="font-medium text-white">{user.fullName}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${getRoleBadgeColor(user.role)}`}
                >
                  {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium space-x-3">
                <Link href={`/admin/users/${user.id}`} className="text-[#3B82F6] hover:text-blue-400">
                  View
                </Link>
                {onDeleteUser && (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this user?")) {
                        onDeleteUser(user.id);
                      }
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400">No users found</p>
        </div>
      )}
    </div>
  );
}
