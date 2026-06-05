// apps/admin/mock-data/reports.ts
export const mockReports = [
  {
    id: '1',
    title: 'User Activity Report',
    description: 'Track user engagement and activity patterns',
    icon: '📊',
    generatedDate: '2024-06-04',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Performance Report',
    description: 'System performance and uptime metrics',
    icon: '⚡',
    generatedDate: '2024-06-04',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Revenue Report',
    description: 'Financial transactions and revenue data',
    icon: '💰',
    generatedDate: '2024-06-03',
    status: 'completed',
  },
  {
    id: '4',
    title: 'Growth Report',
    description: 'User growth trends and statistics',
    icon: '📈',
    generatedDate: '2024-06-02',
    status: 'completed',
  },
];

export interface Report {
  id: string;
  title: string;
  description: string;
  icon: string;
  generatedDate: string;
  status: 'completed' | 'processing' | 'failed';
}
