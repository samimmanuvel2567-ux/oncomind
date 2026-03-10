import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  AlertTriangle, 
  Activity, 
  TrendingUp,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { mockPatients, mockDoctors } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DoctorHome = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [doctorData, setDoctorData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Mock doctor data
    setDoctorData(mockDoctors[0]);
    
    // Get high risk patients as alerts
    const highRiskPatients = mockPatients.filter(p => 
      p.riskLevel === 'high' || p.reassessmentStatus === 'overdue'
    );
    setAlerts(highRiskPatients);
  }, []);

  const stats = [
    { 
      label: 'Total Patients', 
      value: doctorData?.patients?.length || 0, 
      icon: Users,
      color: 'text-primary-green',
      bgColor: 'bg-green-100'
    },
    { 
      label: 'High Risk', 
      value: alerts.filter(p => p.riskLevel === 'high').length, 
      icon: AlertTriangle,
      color: 'text-danger',
      bgColor: 'bg-red-50'
    },
    { 
      label: 'Pending Reviews', 
      value: alerts.length, 
      icon: Clock,
      color: 'text-primary-dark',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          {t('welcome')}, {user?.name || 'Doctor'}!
        </h1>
        <p className="text-white/80">
          Manage your patients and stay on top of critical alerts
        </p>
      </motion.div>

      {/* Stats */}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/doctor/patients">
          <Card hover>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">All Patients</h3>
                  <p className="text-sm text-gray-500">View and manage patient list</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>

        <Link to="/doctor/alerts">
          <Card hover>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Alerts & Red Zone</h3>
                  <p className="text-sm text-gray-500">{alerts.length} requires attention</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Alerts Section */}
      <Card title="Recent Alerts" icon={AlertTriangle}>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.slice(0, 5).map((patient) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    patient.riskLevel === 'high' ? 'bg-danger' : 'bg-warning'
                  }`}>
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{patient.name}</h4>
                    <p className="text-sm text-gray-500">
                      Risk Score: {patient.riskScore} • {patient.riskLevel} risk
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {patient.reassessmentStatus === 'overdue' && (
                    <span className="px-3 py-1 bg-danger text-white text-xs rounded-full">
                      Overdue
                    </span>
                  )}
                  <Link to={`/doctor/patient/${patient.id}`}>
                    <Button variant="secondary" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
            <p className="text-gray-600">No critical alerts at this time</p>
          </div>
        )}
      </Card>

      {/* Upcoming Reassessments */}
      <Card title="Upcoming Reassessments" icon={Calendar}>
        <div className="space-y-3">
          {mockPatients
            .filter(p => p.reassessmentStatus === 'due')
            .slice(0, 3)
            .map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-500">Due: {patient.nextReassessment}</p>
                </div>
                <span className="px-3 py-1 bg-warning text-gray-800 text-xs rounded-full">
                  Due Soon
                </span>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default DoctorHome;

