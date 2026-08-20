export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="mt-2 text-slate-400">Manage system configuration and preferences</p>
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <h2 className="mb-6 text-xl font-bold text-white">General</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Platform Name</label>
            <input
              type="text"
              defaultValue="Zufishan"
              className="w-full rounded-lg border border-[#27272A] bg-black px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Support Email</label>
            <input
              type="email"
              defaultValue="support@zufishan.com"
              className="w-full rounded-lg border border-[#27272A] bg-black px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
          </div>
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Not yet wired to a live endpoint — no backend route exists for saving these values.
        </p>
      </div>
    </div>
  );
}
