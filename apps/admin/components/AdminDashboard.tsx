// apps/admin/components/AdminDashboard.tsx
'use client';

import { UserStats } from '@nexora/types';

interface AdminDashboardProps {
  stats: UserStats;
}

export const AdminDashboard = ({ stats }: AdminDashboardProps) => {
  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      icon: '👥',
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      color: 'bg-green-50 text-green-600 border-green-200',
      icon: '✓',
    },
    {
      label: 'Students',
      value: stats.students,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      icon: '🎓',
    },
    {
      label: 'Tutors',
      value: stats.tutors,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      icon: '🎯',
    },
    {
      label: 'Admins',
      value: stats.admins,
      color: 'bg-red-50 text-red-600 border-red-200',
      icon: '⚙️',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`rounded-lg border-2 p-6 ${card.color} transition transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{card.label}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <span className="text-4xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-2xl mb-2 block">👥</span>
            <p className="font-semibold text-gray-900">Manage Users</p>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-2xl mb-2 block">📊</span>
            <p className="font-semibold text-gray-900">View Reports</p>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-2xl mb-2 block">⚙️</span>
            <p className="font-semibold text-gray-900">System Settings</p>
          </button>
          <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
            <span className="text-2xl mb-2 block">📧</span>
            <p className="font-semibold text-gray-900">Send Message</p>
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {[
            { activity: 'New user registered', time: '2 hours ago', type: 'info' },
            { activity: 'User email verified', time: '4 hours ago', type: 'success' },
            { activity: 'Account deactivated', time: '1 day ago', type: 'warning' },
            { activity: 'New tutor joined', time: '2 days ago', type: 'success' },
            { activity: 'System update completed', time: '3 days ago', type: 'info' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'success' ? 'bg-green-500' :
                  item.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <p className="text-gray-900 font-medium">{item.activity}</p>
              </div>
              <p className="text-sm text-gray-500">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
