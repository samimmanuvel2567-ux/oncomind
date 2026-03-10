import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  AlertTriangle,
  FileText,
  Thermometer,
  Heart,
  Moon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockPatients } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import RiskGauge from '../../components/RiskGauge';
import ProgressBar from '../../components/ProgressBar';
import ReassessmentStatus from '../../components/ReassessmentStatus';

const PatientDashboard = () => {
  const { t } = useTranslation();
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    setPatientData(mockPatients[0]);
  }, []);

  // Mock trend data
  const symptomTrends = [
    { date: 'Jan 1', fatigue: 3, pain: 2, cough: 1 },
    { date: 'Jan 8', fatigue: 2, pain: 2, cough: 1 },
    { date: 'Jan 15', fatigue: 2, pain: 1, cough: 0 },
    { date: 'Jan 22', fatigue: 1, pain: 1, cough: 0 },
    { date: 'Jan 29', fatigue: 1, pain: 0, cough: 0 },
  ];

  const rpiTrends = [
    { date: 'Week 1', rpi: 60 },
    { date: 'Week 2', rpi: 65 },
    { date: 'Week 3', rpi: 70 },
    { date: 'Week 4', rpi: 75 },
    { date: 'Week 5', rpi: 78 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('dashboard')}</h1>
        <p className="text-gray-600">
          Comprehensive view of your health metrics and progress
        </p>
      </motion.div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <Card title={t('riskScore')} icon={AlertTriangle}>
          <div className="flex justify-center">
            <RiskGauge 
              score={patientData?.riskScore || 0} 
              level={patientData?.riskLevel || 'low'}
              size="lg"
              showDetails={true}
            />
          </div>
        </Card>

        {/* RPI */}
        <Card title={t('rpi')} icon={TrendingUp}>
          <div className="space-y-6">
            <div className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold text-success"
              >
                {patientData?.rpi || 0}
              </motion.span>
              <span className="text-xl text-gray-500">/100</span>
            </div>
            
            <ProgressBar 
              value={patientData?.rpi || 0} 
              color="success"
              height="lg"
            />

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Symptoms</p>
                <p className="font-semibold text-gray-800">75%</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Adherence</p>
                <p className="font-semibold text-gray-800">{patientData?.adherence || 0}%</p>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Progress</p>
                <p className="font-semibold text-gray-800">82%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Reassessment */}
        <Card title={t('reassessment')} icon={Calendar}>
          <ReassessmentStatus 
            status={patientData?.reassessmentStatus || 'up-to-date'}
            lastAssessment={patientData?.lastAssessment}
            nextReassessment={patientData?.nextReassessment}
          />
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symptom Trends */}
        <Card title="Symptom Trends" icon={Activity}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={symptomTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#888" fontSize={12} />
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
                dataKey="fatigue" 
                stroke="#DC3545" 
                strokeWidth={2}
                dot={{ fill: '#DC3545' }}
                name="Fatigue"
              />
              <Line 
                type="monotone" 
                dataKey="pain" 
                stroke="#FFD700" 
                strokeWidth={2}
                dot={{ fill: '#FFD700' }}
                name="Pain"
              />
              <Line 
                type="monotone" 
                dataKey="cough" 
                stroke="#228B22" 
                strokeWidth={2}
                dot={{ fill: '#228B22' }}
                name="Cough"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger"></div>
              <span className="text-sm text-gray-600">Fatigue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-sm text-gray-600">Pain</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-sm text-gray-600">Cough</span>
            </div>
          </div>
        </Card>

        {/* RPI Progress */}
        <Card title="Recovery Progress" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={rpiTrends}>
              <defs>
                <linearGradient id="rpiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#228B22" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#228B22" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="rpi" 
                stroke="#228B22" 
                fillOpacity={1} 
                fill="url(#rpiGradient)"
                name="RPI Score"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Current Symptoms */}
      <Card title="Current Symptoms" icon={Thermometer}>
        {patientData?.symptoms?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {patientData.symptoms.map((symptom, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{symptom.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    symptom.severity <= 2 ? 'bg-green-100 text-green-800' :
                    symptom.severity === 3 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Level {symptom.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Duration: {symptom.duration}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Thermometer className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">No symptoms recorded</p>
          </div>
        )}
      </Card>

      {/* Health Tips */}
      <Card title="Health Tips" icon={Heart}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Moon, title: 'Rest Well', desc: 'Aim for 7-8 hours of sleep' },
            { icon: Activity, title: 'Stay Active', desc: 'Light exercise daily' },
            { icon: Heart, title: 'Healthy Diet', desc: 'Balanced nutrition' },
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-gradient-to-br from-red-50 to-white rounded-lg border border-red-100"
            >
              <tip.icon className="w-8 h-8 text-primary-red mb-2" />
              <h4 className="font-semibold text-gray-800">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;

