// apps/admin/app/reports/page.tsx
export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate and view platform reports</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'User Activity Report', description: 'Track user engagement and activity patterns' },
            { title: 'Performance Report', description: 'System performance and uptime metrics' },
            { title: 'Revenue Report', description: 'Financial transactions and revenue data' },
            { title: 'Growth Report', description: 'User growth trends and statistics' },
          ].map((report, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition">
              <h3 className="font-semibold text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{report.description}</p>
              <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
                View Report →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
