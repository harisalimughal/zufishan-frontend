// apps/admin/mock-data/settings.ts
export interface SystemSettings {
  platformName: string;
  supportEmail: string;
  maxUploadSize: number;
  twoFactorAuthEnabled: boolean;
  emailVerificationRequired: boolean;
  smtpServer: string;
  smtpPort: number;
}

export const defaultSystemSettings: SystemSettings = {
  platformName: 'Nexora',
  supportEmail: 'support@nexora.com',
  maxUploadSize: 50,
  twoFactorAuthEnabled: false,
  emailVerificationRequired: true,
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
};

export interface SystemStatistics {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalCourses: number;
  activeSessions: number;
  systemUptime: number; // in percentage
  lastBackup: string; // ISO date string
  storageUsed: number; // in GB
  storageTotal: number; // in GB
}

export const mockSystemStatistics: SystemStatistics = {
  totalUsers: 6,
  activeUsers: 5,
  newUsersThisMonth: 2,
  totalCourses: 12,
  activeSessions: 3,
  systemUptime: 99.9,
  lastBackup: '2024-06-04T02:00:00Z',
  storageUsed: 45.6,
  storageTotal: 100,
};
