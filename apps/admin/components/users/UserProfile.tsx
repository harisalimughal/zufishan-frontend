// apps/admin/components/users/UserProfile.tsx
'use client';

import { User } from '@nexora/types';

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-600';
      case 'tutor':
        return 'text-blue-600';
      case 'student':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full border-4 border-blue-200"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className={`text-lg font-semibold mt-2 ${getRoleColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-4 py-2 rounded-lg ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">First Name</label>
            <p className="text-gray-900 mt-1">{user.firstName}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Last Name</label>
            <p className="text-gray-900 mt-1">{user.lastName}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Gender</label>
            <p className="text-gray-900 mt-1 capitalize">{user.gender}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
            <p className="text-gray-900 mt-1">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <p className="text-gray-900 mt-1">{user.email}</p>
            {user.emailVerified && (
              <span className="text-xs text-green-600 font-medium">✓ Verified</span>
            )}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
            <p className="text-gray-900 mt-1">{user.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Street Address</label>
            <p className="text-gray-900 mt-1">{user.address}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">City</label>
            <p className="text-gray-900 mt-1">{user.city}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">State/Province</label>
            <p className="text-gray-900 mt-1">{user.state}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Zip/Postal Code</label>
            <p className="text-gray-900 mt-1">{user.zipCode}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Country</label>
            <p className="text-gray-900 mt-1">{user.country}</p>
          </div>
        </div>
      </div>

      {/* Educational/Professional Information */}
      {(user.institution || user.grade || user.subject) && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.institution && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Institution</label>
                <p className="text-gray-900 mt-1">{user.institution}</p>
              </div>
            )}
            {user.grade && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Grade</label>
                <p className="text-gray-900 mt-1">{user.grade}</p>
              </div>
            )}
            {user.subject && (
              <div>
                <label className="text-sm font-semibold text-gray-600">Subject</label>
                <p className="text-gray-900 mt-1">{user.subject}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bio */}
      {user.bio && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bio</h2>
          <p className="text-gray-900 leading-relaxed">{user.bio}</p>
        </div>
      )}

      {/* Activity Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600">Member Since</label>
            <p className="text-gray-900 mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600">Last Updated</label>
            <p className="text-gray-900 mt-1">{new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
          {user.lastLogin && (
            <div>
              <label className="text-sm font-semibold text-gray-600">Last Login</label>
              <p className="text-gray-900 mt-1">{new Date(user.lastLogin).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
