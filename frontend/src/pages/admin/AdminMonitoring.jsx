import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockAdminStats } from '../../utils/mockData';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Card from '../../components/ui/Card';

const AdminMonitoring = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(mockAdminStats);
  }, []);

  // Mock system metrics
  const systemMetrics = [
    { name: '00:00', cpu: 45, memory: 62, requests: 120 },
    { name: '04:00', cpu: 35, memory: 58, requests: 80 },
    { name: '08:00', cpu: 65, memory: 72, requests: 250 },
    { name: '12:00', cpu: 85, memory: 80, requests: 420 },
    { name: '16:00', cpu: 75, memory: 76, requests: 380 },
    { name: '20:00', cpu: 55, memory: 68, requests: 200 },
  ];

  const services = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { name: 'Auth Service', status: 'healthy', uptime: '99.8%', latency: '23ms' },
    { name: 'Risk Engine', status: 'healthy', uptime: '99.7%', latency: '120ms' },
    { name: 'Report Processor', status: 'warning', uptime: '98.5%', latency: '450ms' },
    { name: 'LLM Service', status: 'healthy', uptime: '99.6%', latency: '380ms' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-danger" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('monitoring')}</h1>
        <p className="text-gray-600">System health and performance metrics</p>
      </motion.div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'System Status', value: 'Healthy', icon: Shield, color: 'text-success', bg: 'bg-green-100' },
          { label: 'Uptime', value: '99.8%', icon: Clock, color: 'text-success', bg: 'bg-green-100' },
          { label: 'Active Connections', value: '1,247', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Response Time', value: '125ms', icon: TrendingUp, color: 'text-warning', bg: 'bg-yellow-100' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Load */}
        <Card title="System Load" icon={Activity}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
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
                dataKey="cpu" 
                stroke="#B22222" 
                strokeWidth={2}
                name="CPU %"
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#228B22" 
                strokeWidth={2}
                name="Memory %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Requests */}
        <Card title="API Requests" icon={Database}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={systemMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
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
                dataKey="requests" 
                stroke="#B22222" 
                strokeWidth={2}
                name="Requests/min"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Service Status */}
      <Card title="Service Status" icon={Server}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Uptime</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">Latency</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, idx) => (
                <motion.tr
                  key={service.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Server className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800">{service.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span className={`capitalize ${
                        service.status === 'healthy' ? 'text-success' : 
                        service.status === 'warning' ? 'text-warning' : 'text-danger'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-800">{service.uptime}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`${
                      parseInt(service.latency) > 200 ? 'text-warning' : 'text-gray-800'
                    }`}>
                      {service.latency}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Compliance Overview */}
      <Card title="Compliance Overview" icon={Shield}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '45-Day Compliance', value: `${stats?.complianceRate || 0}%`, progress: stats?.complianceRate || 0 },
            { label: 'Reports Submitted', value: '892', progress: 89 },
            { label: 'Pending Reviews', value: '45', progress: 15 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  className={`h-full rounded-full ${
                    item.progress >= 80 ? 'bg-success' :
                    item.progress >= 50 ? 'bg-warning' : 'bg-danger'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminMonitoring;

