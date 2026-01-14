import React, { useState } from 'react';
import { LogOut, ChevronDown, Search, Plus, Edit2, Trash2, Eye, Bell } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

const AdminDashboard = ({ onLogout }) => {
  const { user } = useUserProfile();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [campusFilter, setCampusFilter] = useState('all');

  // Mock data - in production this would come from API
  const [systemUsers] = useState([
    {
      id: 1,
      name: 'University Administrator',
      email: 'admin@psu.edu.ph',
      role: 'System Administrator',
      campus: 'Main Campus',
      lastLogin: '2025-01-12',
      status: 'active'
    },
    {
      id: 2,
      name: 'Registrar Office',
      email: 'registrar@psu.edu.ph',
      role: 'Registrar User',
      campus: 'Main Campus',
      lastLogin: '2025-01-12',
      status: 'active'
    },
    {
      id: 3,
      name: 'OSAA Office',
      email: 'osaa@psu.edu.ph',
      role: 'OSAA User',
      campus: 'Main Campus',
      lastLogin: '2025-01-11',
      status: 'active'
    },
    {
      id: 4,
      name: 'Dean - Engineering',
      email: 'dean@psu.edu.ph',
      role: 'Dean User',
      campus: 'College of Engineering',
      lastLogin: '2025-01-10',
      status: 'active'
    }
  ]);

  const [userActivityLogs] = useState([
    { timestamp: '2025-01-01 02:04 PM', admin: 'Admin', action: 'Logged in', details: 'Accessed student records' },
    { timestamp: '2025-01-01 02:00 PM', admin: 'Admin', action: 'Exported Data', details: 'Downloaded enrollment analysis' },
    { timestamp: '2025-01-02 03:15 AM', admin: 'Dean - Engineering', action: 'Updated Data', details: 'Uploaded faculty demographics data' },
    { timestamp: '2025-01-04 04:45 PM', admin: 'Registrar Office', action: 'Viewed Analytics', details: 'Reviewed graduation trends' },
    { timestamp: '2025-01-06 08:30 AM', admin: 'OSAA', action: 'Updated Data', details: 'Uploaded campus engagement data' },
    { timestamp: '2024-12-29 07:00 AM', admin: 'OSAA', action: 'Viewed Analytics', details: 'Reviewed campus engagement trends' },
    { timestamp: '2024-12-28 05:16 PM', admin: 'Registrar Office', action: 'Exported Data', details: 'Downloaded academic analytics' },
    { timestamp: '2024-12-28 10:59 AM', admin: 'OSAA', action: 'Viewed Analytics', details: 'Accessed geographic distribution report' }
  ]);

  const filteredUsers = systemUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = campusFilter === 'all' || u.campus === campusFilter;
    return matchesSearch && matchesCampus;
  });

  const handleLogout = () => {
    setShowProfileDropdown(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PSU</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{user?.name || 'Administrator'}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {user?.role || 'System Administrator'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage system users and their access permissions</p>
        </div>

        {/* System Users Section */}
        <div className="bg-white rounded-lg border-2 border-blue-500 overflow-hidden mb-8">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredUsers.length} of {systemUsers.length} users
              </p>
            </div>
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New User
            </button>
          </div>

          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Campuses</option>
              <option value="Main Campus">Main Campus</option>
              <option value="College of Engineering">College of Engineering</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
              All Stores
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Campus/Department</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.campus}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.lastLogin}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                        u.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {u.status === 'active' ? '✓ Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded transition" title="View">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 rounded transition" title="Edit">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded transition" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Activity Log Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">User Activity Logs</h3>
            <p className="text-sm text-gray-600 mt-1">Recent user management audit trails</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody>
                {userActivityLogs.map((log, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">{log.timestamp}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.admin}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
