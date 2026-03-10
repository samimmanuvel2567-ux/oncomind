import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { mockAdminStats } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminHome = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(mockAdminStats);
  }, []);

  const statCards = [
    { 
      label: 'Total Patients', 
      value: stats?.totalPatients || 0, 
      icon: Users,
      color: 'text-primary-green',
      bgColor: 'bg-green-100',
      change: '+12%'
    },
    { 
      label: 'Active Users', 
      value: stats?.activeUsers || 0, 
      icon: Activity,
      color: 'text-success',
      bgColor: 'bg-green-100',
      change: '+8%'
    },
    { 
      label: 'Compliance Rate', 
      value: `${stats?.complianceRate || 0}%`, 
      icon: Shield,
      color: 'text-primary-dark',
      bgColor: 'bg-green-50',
      change: '+5%'
    },
    { 
      label: 'Avg Risk Score', 
      value: stats?.averageRiskScore || 0, 
      icon: AlertTriangle,
      color: 'text-danger',
      bgColor: 'bg-red-50',
      change: '-3%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          {t('welcome')}, {user?.name || 'Admin'}!
        </h1>
        <p className="text-white/80">
          System overview and administrative controls
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-success font-medium">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/stats">
          <Card hover>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{t('stats')}</h3>
                  <p className="text-sm text-gray-500">View analytics</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Link to="/admin/users">
          <Card hover>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{t('users')}</h3>
                  <p className="text-sm text-gray-500">Manage users</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Link to="/admin/monitoring">
          <Card hover>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{t('monitoring')}</h3>
                  <p className="text-sm text-gray-500">System health</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity" icon={Activity}>
        <div className="space-y-3">
          {[
            { action: 'New patient registered', time: '2 minutes ago', icon: Users },
            { action: 'Risk assessment completed', time: '15 minutes ago', icon: AlertTriangle },
            { action: 'Report uploaded', time: '1 hour ago', icon: Activity },
            { action: 'Reassessment completed', time: '2 hours ago', icon: CheckCircle },
          ].map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-white rounded-lg">
                <activity.icon className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminHome;

