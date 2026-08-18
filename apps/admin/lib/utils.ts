// apps/admin/lib/utils.ts
import { User, UserFilter } from '@nexora/types';

/**
 * Filter users based on filter criteria
 */
export const filterUsers = (users: User[], filter: UserFilter): User[] => {
  return users.filter((user) => {
    if (filter.role && user.role !== filter.role) {
      return false;
    }

    if (filter.status === 'active' && !user.isActive) {
      return false;
    }

    if (filter.status === 'inactive' && user.isActive) {
      return false;
    }

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      return (
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

/**
 * Sort users based on sort criteria
 */
export const sortUsers = (
  users: User[],
  sortBy: 'createdAt' | 'name' | 'email' = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): User[] => {
  const sorted = [...users].sort((a, b) => {
    let aVal: any;
    let bVal: any;

    switch (sortBy) {
      case 'name':
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
        break;
      case 'email':
        aVal = a.email.toLowerCase();
        bVal = b.email.toLowerCase();
        break;
      case 'createdAt':
      default:
        aVal = new Date(a.createdAt).getTime();
        bVal = new Date(b.createdAt).getTime();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get user initials
 */
export const getUserInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s()]+$/;
  return phoneRegex.test(phone);
};
