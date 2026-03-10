import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  TrendingUp,
  PieChart,
  BarChart3,
  Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockAdminStats } from '../../utils/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminStats = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(mockAdminStats);
  }, []);

  const COLORS = ['#228B22', '#FFD700', '#DC3545'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('stats')}</h1>
          <p className="text-gray-600">Comprehensive analytics and insights</p>
        </div>
        <Button variant="secondary" icon={Download}>
          Export Report
        </Button>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Patients', value: stats?.totalPatients, icon: Users },
          { label: 'Total Doctors', value: stats?.totalDoctors, icon: Activity },
          { label: 'Active Users', value: stats?.activeUsers, icon: TrendingUp },
          { label: 'Compliance', value: `${stats?.complianceRate}%`, icon: PieChart },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-red/10 rounded-lg">
                  <item.icon className="w-5 h-5 text-primary-red" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-xl font-bold text-gray-800">{item.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card title="Monthly Trends" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="#B22222" 
                strokeWidth={2}
                name="Patients"
              />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#228B22" 
                strokeWidth={2}
                name="Avg Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Risk Distribution */}
        <Card title="Risk Distribution" icon={PieChart}>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={stats?.riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {stats?.riskDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {stats?.riskDistribution?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Regional Data */}
      <Card title="Regional Distribution" icon={Activity}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats?.regionalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="region" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="patients" fill="#B22222" name="Patients" radius={[4, 4, 0, 0]} />
            <Bar dataKey="riskScore" fill="#228B22" name="Avg Risk" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Patient Growth">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">+{stats?.monthlyNewPatients}</p>
              <p className="text-sm text-gray-500">New this month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
        </Card>
        
        <Card title="Risk Reduction">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-800">-8%</p>
              <p className="text-sm text-gray-500">Avg risk score change</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success rotate-180" />
          </div>
        </Card>
        
        <Card title="System Health">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-success">98%</p>
              <p className="text-sm text-gray-500">Uptime</p>
            </div>
            <Activity className="w-8 h-8 text-success" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminStats;

