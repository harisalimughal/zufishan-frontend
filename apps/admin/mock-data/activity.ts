// apps/admin/mock-data/activity.ts
export interface ActivityLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  description: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  metadata?: Record<string, any>;
}

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    userId: '6',
    userName: 'Michael Brown',
    action: 'User Signup',
    description: 'New user registered successfully',
    timestamp: '2024-06-04T14:30:00Z',
    type: 'success',
    metadata: { role: 'student' },
  },
  {
    id: '2',
    userId: '6',
    userName: 'Michael Brown',
    action: 'Email Verification',
    description: 'User email verified',
    timestamp: '2024-06-04T10:15:00Z',
    type: 'success',
  },
  {
    id: '3',
    userId: '5',
    userName: 'Sarah Wilson',
    action: 'Account Deactivation',
    description: 'User account deactivated',
    timestamp: '2024-05-28T09:45:00Z',
    type: 'warning',
  },
  {
    id: '4',
    userId: '2',
    userName: 'Jane Smith',
    action: 'Profile Updated',
    description: 'Tutor profile information updated',
    timestamp: '2024-06-02T16:20:00Z',
    type: 'info',
  },
  {
    id: '5',
    action: 'System Update',
    description: 'Platform update completed successfully',
    timestamp: '2024-06-01T08:00:00Z',
    type: 'info',
    metadata: { version: '1.0.0' },
  },
];

export const getRecentActivityLogs = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getActivityLogsByUser = (userId: string): ActivityLog[] => {
  return mockActivityLogs.filter((log) => log.userId === userId);
};

export const getActivityLogsByType = (type: ActivityLog['type']): ActivityLog[] => {
  return mockActivityLogs.filter((log) => log.type === type);
};
