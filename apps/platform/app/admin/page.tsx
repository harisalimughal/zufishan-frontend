"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "@/features/admin/AdminDashboard";
import { adminService, AdminStats } from "@/services/adminService";

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminService
      .getStats()
      .then(setStats)
      .catch((err) => setError(err?.message || "Failed to load stats"));
  }, []);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  if (!stats) {
    return <p className="text-slate-400">Loading…</p>;
  }

  return <AdminDashboard stats={stats} />;
}
