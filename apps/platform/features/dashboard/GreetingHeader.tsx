"use client";

import { useAuth } from "@/context/AuthContext";

export function GreetingHeader() {
  let user = null;
  try {
    const auth = useAuth();
    user = auth?.user || null;
  } catch {
    user = null;
  }

  const hour = new Date().getHours();
  let greeting = "Good morning";
  if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17) greeting = "Good evening";

  const displayName = user?.fullName ? user.fullName.split(" ")[0] : "Student";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {greeting}, {displayName} 👋
      </h1>
      <p className="mt-1 text-sm text-gray-400">
        Ready to learn something amazing today?
      </p>
    </div>
  );
}
