// User and Registration Types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  role: 'student' | 'tutor' | 'admin';
  institution?: string;
  grade?: string;
  subject?: string;
  bio?: string;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  password: string;
  confirmPassword: string;
  institution: string;
  termsAccepted: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  students: number;
  tutors: number;
  admins: number;
}

export interface UserFilter {
  role?: string;
  status?: 'active' | 'inactive';
  searchTerm?: string;
  sortBy?: 'createdAt' | 'name' | 'email';
  sortOrder?: 'asc' | 'desc';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}
