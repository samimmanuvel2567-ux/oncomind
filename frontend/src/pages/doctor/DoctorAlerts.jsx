import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Users, 
  Clock,
  CheckCircle,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockPatients } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DoctorAlerts = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Get patients with alerts
    const alertPatients = mockPatients.filter(p => 
      p.riskLevel === 'high' || 
      p.riskLevel === 'medium' || 
      p.reassessmentStatus === 'overdue' ||
      p.reassessmentStatus === 'due'
    );
    setAlerts(alertPatients);
  }, []);

  const getAlertType = (patient) => {
    if (patient.riskLevel === 'high') return { type: 'red', label: 'Red Zone', icon: AlertTriangle };
    if (patient.riskLevel === 'medium') return { type: 'yellow', label: 'Medium Risk', icon: AlertTriangle };
    if (patient.reassessmentStatus === 'overdue') return { type: 'red', label: 'Overdue', icon: Clock };
    if (patient.reassessmentStatus === 'due') return { type: 'yellow', label: 'Due Soon', icon: Clock };
    return { type: 'green', label: 'Normal', icon: CheckCircle };
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    const alertType = getAlertType(alert);
    return alertType.type === filter;
  });

  const redAlerts = alerts.filter(a => getAlertType(a).type === 'red').length;
  const yellowAlerts = alerts.filter(a => getAlertType(a).type === 'yellow').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('alerts')}</h1>
        <p className="text-gray-600">
          Patients requiring immediate attention
        </p>
      </motion.div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-danger/10 border-2 border-danger rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-danger rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-danger">{redAlerts}</p>
              <p className="text-gray-600">Critical Alerts</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-warning/10 border-2 border-warning rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-warning rounded-xl">
              <Bell className="w-6 h-6 text-gray-800" />
            </div>
            <div>
              <p className="text-3xl font-bold text-warning">{yellowAlerts}</p>
              <p className="text-gray-600">Warnings</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-success/10 border-2 border-success rounded-xl p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-success">{alerts.length}</p>
              <p className="text-gray-600">Total Alerts</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-primary-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('red')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'red' ? 'bg-danger text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setFilter('yellow')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'yellow' ? 'bg-warning text-gray-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Warnings
        </button>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((patient, index) => {
          const alertInfo = getAlertType(patient);
          const AlertIcon = alertInfo.icon;
          
          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                hover 
                className={`
                  ${alertInfo.type === 'red' ? 'border-l-4 border-l-danger' : ''}
                  ${alertInfo.type === 'yellow' ? 'border-l-4 border-l-warning' : ''}
                `}
              >
                <Link to={`/doctor/patient/${patient.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        p-3 rounded-xl
                        ${alertInfo.type === 'red' ? 'bg-danger' : ''}
                        ${alertInfo.type === 'yellow' ? 'bg-warning' : ''}
                        ${alertInfo.type === 'green' ? 'bg-success' : ''}
                      `}>
                        <AlertIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                          <span className={`
                            px-2 py-0.5 rounded text-xs font-medium
                            ${alertInfo.type === 'red' ? 'bg-danger/20 text-danger' : ''}
                            ${alertInfo.type === 'yellow' ? 'bg-warning/20 text-warning' : ''}
                          `}>
                            {alertInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Risk Score</p>
                        <p className="font-bold text-lg">{patient.riskScore}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">RPI</p>
                        <p className="font-bold text-lg">{patient.rpi}</p>
                      </div>
                      {patient.reassessmentStatus !== 'up-to-date' && (
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Reassessment</p>
                          <span className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${patient.reassessmentStatus === 'overdue' ? 'bg-danger text-white' : 'bg-warning text-gray-800'}
                          `}>
                            {patient.reassessmentStatus}
                          </span>
                        </div>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-success" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Alerts</h3>
            <p className="text-gray-500">All patients are in good standing</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAlerts;

