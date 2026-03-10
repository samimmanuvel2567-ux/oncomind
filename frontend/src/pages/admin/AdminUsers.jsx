import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter,
  UserCheck,
  UserX,
  MoreVertical,
  Shield,
  Stethoscope,
  User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockPatients, mockDoctors } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminUsers = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('patients');

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Shield;
      case 'doctor': return Stethoscope;
      default: return User;
    }
  };

  const patients = mockPatients.map(p => ({ ...p, role: 'patient' }));
  const doctors = mockDoctors.map(d => ({ ...d, role: 'doctor' }));
  const admins = [{ id: 1, name: 'Admin User', email: 'admin@oncomind.com', role: 'admin', status: 'active' }];

  const allUsers = [...patients, ...doctors, ...admins];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.role === filter || user.riskLevel === filter;
    return matchesSearch && matchesFilter;
  });

  const getRiskBadge = (level) => {
    switch (level) {
      case 'high': return { color: 'bg-danger text-white', label: 'High' };
      case 'medium': return { color: 'bg-warning text-gray-800', label: 'Medium' };
      case 'low': return { color: 'bg-success text-white', label: 'Low' };
      default: return { color: 'bg-gray-200 text-gray-600', label: 'N/A' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('users')}</h1>
        <p className="text-gray-600">Manage all users in the system</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {['patients', 'doctors', 'admins'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-primary-red border-b-2 border-primary-red'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option value="all">All</option>
            <option value="patient">Patients</option>
            <option value="doctor">Doctors</option>
            <option value="admin">Admins</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{patients.length}</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Stethoscope className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{admins.length}</p>
              <p className="text-sm text-gray-500">Admins</p>
            </div>
          </div>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Risk Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.slice(0, 10).map((user, idx) => {
                const riskBadge = getRiskBadge(user.riskLevel);
                const RoleIcon = getRoleIcon(user.role);
                
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-red/10 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-primary-red">
                            {user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-500">{user.email || 'No email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <RoleIcon className="w-4 h-4 text-gray-500" />
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.riskLevel ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskBadge.color}`}>
                          {riskBadge.label}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;

