export default function AdminReportsPage() {
  const reports = [
    { title: "User Activity Report", description: "Track user engagement and activity patterns" },
    { title: "Performance Report", description: "System performance and uptime metrics" },
    { title: "Growth Report", description: "User growth trends and statistics" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="mt-2 text-slate-400">Generate and view platform reports</p>
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <div
              key={report.title}
              className="rounded-lg border border-[#27272A] p-4 transition-colors hover:border-[#3B82F6]/40"
            >
              <h3 className="font-semibold text-white">{report.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{report.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
