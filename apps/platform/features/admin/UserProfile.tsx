"use client";

import { AdminUser } from "@/services/adminService";

interface UserProfileProps {
  user: AdminUser;
}

function getRoleColor(role: string) {
  switch (role) {
    case "ADMIN":
      return "text-purple-400";
    case "TUTOR":
      return "text-[#3B82F6]";
    case "STUDENT":
      return "text-emerald-400";
    default:
      return "text-slate-300";
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <div className="flex items-center space-x-6">
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-24 w-24 rounded-full border-4 border-[#27272A]"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
            <p className={`mt-2 text-lg font-semibold ${getRoleColor(user.role)}`}>
              {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            </p>
            <p className="mt-1 text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
      </div>

      {user.bio && (
        <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Bio</h2>
          <p className="leading-relaxed text-slate-300">{user.bio}</p>
        </div>
      )}

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <h2 className="mb-4 text-xl font-bold text-white">Activity</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Member Since
            </label>
            <p className="mt-1 text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Last Updated
            </label>
            <p className="mt-1 text-white">{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
