import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Activity, 
  FileText,
  Stethoscope,
  CheckCircle,
  Calendar,
  TrendingUp,
  Send
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockPatients, availableTests, mockStructuredReport } from '../../utils/mockData';
import { recommendTests } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import RiskGauge from '../../components/RiskGauge';
import ProgressBar from '../../components/ProgressBar';
import ReassessmentStatus from '../../components/ReassessmentStatus';
import StructuredReport from '../../components/StructuredReport';
import Modal from '../../components/ui/Modal';

const DoctorPatientDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [showTestModal, setShowTestModal] = useState(false);
  const [recommending, setRecommending] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const patientData = mockPatients.find(p => p.id === parseInt(id));
    setPatient(patientData);
  }, [id]);

  const toggleTest = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(t => t !== testId)
        : [...prev, testId]
    );
  };

  const handleRecommendTests = async () => {
    if (selectedTests.length === 0) return;
    
    setRecommending(true);
    try {
      await recommendTests(1, patient.id, selectedTests);
      setShowTestModal(false);
      setSelectedTests([]);
      alert('Tests recommended successfully!');
    } catch (error) {
      console.error('Error recommending tests:', error);
    } finally {
      setRecommending(false);
    }
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  const isRedZone = patient.riskScore >= 70;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/doctor/patients">
        <Button variant="ghost" icon={ArrowLeft}>
          Back to Patients
        </Button>
      </Link>

      {/* Red Zone Alert */}
      {isRedZone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-danger/10 border-2 border-danger rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-danger rounded-xl animate-pulse">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-danger">Red Zone Alert</h2>
                <p className="text-gray-600">
                  This patient's risk score ({patient.riskScore}) is in the critical range
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              icon={Stethoscope}
              onClick={() => setShowTestModal(true)}
            >
              Recommend Tests
            </Button>
          </div>
        </motion.div>
      )}

      {/* Patient Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <Card>
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-primary-red">
                {patient.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
            <p className="text-gray-500">{patient.age} years • {patient.gender}</p>
            
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Adherence</p>
                  <p className="font-bold text-lg">{patient.adherence}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Symptoms</p>
                  <p className="font-bold text-lg">{patient.symptoms.length}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Score */}
        <Card title={t('riskScore')} icon={AlertTriangle}>
          <div className="flex justify-center">
            <RiskGauge 
              score={patient.riskScore} 
              level={patient.riskLevel}
              size="md"
              showDetails={true}
            />
          </div>
        </Card>

        {/* RPI */}
        <Card title={t('rpi')} icon={TrendingUp}>
          <div className="space-y-4">
            <div className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold text-success"
              >
                {patient.rpi}
              </motion.span>
              <span className="text-xl text-gray-500">/100</span>
            </div>
            <ProgressBar value={patient.rpi} color="success" height="lg" />
          </div>
        </Card>
      </div>

      {/* Reassessment & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={t('reassessment')} icon={Calendar}>
          <ReassessmentStatus 
            status={patient.reassessmentStatus}
            lastAssessment={patient.lastAssessment}
            nextReassessment={patient.nextReassessment}
          />
        </Card>

        {/* Quick Actions */}
        <Card title="Actions" icon={Activity}>
          <div className="space-y-3">
            <Button
              variant="primary"
              icon={FileText}
              onClick={() => setShowReport(!showReport)}
              className="w-full"
            >
              {showReport ? 'Hide Report' : 'View Structured Report'}
            </Button>
            <Button
              variant="secondary"
              icon={Stethoscope}
              onClick={() => setShowTestModal(true)}
              className="w-full"
            >
              Recommend Diagnostic Tests
            </Button>
          </div>
        </Card>
      </div>

      {/* Structured Report */}
      {showReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StructuredReport report={mockStructuredReport} showFullDetails={true} />
        </motion.div>
      )}

      {/* Current Symptoms */}
      <Card title="Current Symptoms" icon={Activity}>
        {patient.symptoms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patient.symptoms.map((symptom, idx) => (
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
            <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500">No symptoms recorded</p>
          </div>
        )}
      </Card>

      {/* Test Recommendation Modal */}
      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Recommend Diagnostic Tests"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Select tests to recommend for this patient. The patient will be notified.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {availableTests.map((test) => (
              <motion.div
                key={test.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleTest(test.id)}
                className={`
                  p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedTests.includes(test.id)
                    ? 'border-primary-red bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{test.name}</h4>
                    <p className="text-sm text-gray-500">{test.description}</p>
                  </div>
                  {selectedTests.includes(test.id) && (
                    <CheckCircle className="w-5 h-5 text-primary-red" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              {selectedTests.length} test(s) selected
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowTestModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={Send}
                onClick={handleRecommendTests}
                loading={recommending}
                disabled={selectedTests.length === 0}
              >
                Send Recommendations
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorPatientDetail;

