export function UserProfileCard() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-[#27272A] bg-black px-3 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-semibold text-white">
        U
      </div>
      <div className="hidden text-left sm:block">
        <p className="text-sm font-medium text-white">User</p>
        <p className="text-xs text-slate-400">Student</p>
      </div>
    </div>
  );
}
