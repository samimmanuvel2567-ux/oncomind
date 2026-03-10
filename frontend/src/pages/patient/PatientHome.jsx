import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  FileText, 
  Scan, 
  AlertTriangle,
  Calendar,
  ArrowRight,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { mockPatients } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import RiskGauge from '../../components/RiskGauge';
import ProgressBar from '../../components/ProgressBar';

const PatientHome = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Mock patient data - in production, fetch from API
    setPatientData(mockPatients[0]);
  }, []);

  const stats = [
    { 
      label: t('riskScore'), 
      value: patientData?.riskScore || 0, 
      icon: Activity,
      color: 'text-primary-green',
      bgColor: 'bg-green-100'
    },
    { 
      label: t('rpi'), 
      value: patientData?.rpi || 0, 
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'Adherence', 
      value: patientData?.adherence || 0, 
      icon: Shield,
      color: 'text-primary-dark',
      bgColor: 'bg-green-50'
    }
  ];

  const quickActions = [
    {
      title: t('symptoms'),
      description: 'Report and track your symptoms',
      icon: Activity,
      path: '/patient/symptoms',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: t('skinCheck'),
      description: 'Upload images for skin analysis',
      icon: Scan,
      path: '/patient/skin-check',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      title: t('reports'),
      description: 'Upload and view medical reports',
      icon: FileText,
      path: '/patient/reports',
      color: 'from-green-600 to-emerald-700'
    },
    {
      title: t('dashboard'),
      description: 'View detailed health metrics',
      icon: TrendingUp,
      path: '/patient/dashboard',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-red to-primary-dark rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          {t('welcome')}, {user?.name || 'Patient'}!
        </h1>
        <p className="text-white/80">
          Monitor your health and stay proactive with OncoMind
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Risk Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('riskScore')} icon={AlertTriangle}>
          <div className="flex justify-center">
            <RiskGauge 
              score={patientData?.riskScore || 0} 
              level={patientData?.riskLevel || 'low'}
              size="md"
            />
          </div>
        </Card>

        <Card title="Recovery Progress" icon={TrendingUp}>
          <div className="space-y-4">
            <ProgressBar 
              value={patientData?.rpi || 0} 
              label="Recovery Progress Index"
              color="success"
              height="lg"
            />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Last Assessment</p>
                <p className="font-semibold text-gray-800">{patientData?.lastAssessment || 'N/A'}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Next Reassessment</p>
                <p className="font-semibold text-gray-800">{patientData?.nextReassessment || 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.path}>
                <Card hover className="h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                  <div className="flex items-center text-primary-red mt-4 text-sm font-medium">
                    <span>Access</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <Card title="Upcoming" icon={Calendar}>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="font-medium text-gray-800">Reassessment Due</span>
            </div>
            <span className="text-sm text-gray-600">{patientData?.nextReassessment || 'TBD'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientHome;

