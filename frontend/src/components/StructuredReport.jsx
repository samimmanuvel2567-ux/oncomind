import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from './ui/Card';
import Button from './ui/Button';

const StructuredReport = ({ report, showFullDetails = false }) => {
  const { user } = useAuth();
  const [showFull, setShowFull] = useState(showFullDetails);
  const [expandedSection, setExpandedSection] = useState(null);

  if (!report) return null;

  const { extractedData, summary, recommendations, aiInsights } = report;

  // Determine what to show based on user role
  const isDoctorOrAdmin = user?.role === 'doctor' || user?.role === 'admin';

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-red" />
          <h3 className="text-xl font-bold text-primary-dark">Structured Report</h3>
        </div>
        {isDoctorOrAdmin && (
          <Button
            variant={showFull ? 'primary' : 'secondary'}
            size="sm"
            icon={showFull ? EyeOff : Eye}
            onClick={() => setShowFull(!showFull)}
          >
            {showFull ? 'Hide Sensitive Data' : 'Show Full Report'}
          </Button>
        )}
      </div>

      {/* Main Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(extractedData).map(([key, value]) => {
          // Hide sensitive fields for patients unless explicitly shown
          const sensitiveFields = ['cancerType', 'tumorGrade', 'lymphNodeInvolvement'];
          const isSensitive = sensitiveFields.includes(key);
          
          if (!showFull && isSensitive && !isDoctorOrAdmin) {
            return (
              <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-500 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 italic">Protected</span>
                </div>
              </div>
            );
          }

          // Highlight elevated/dangerous values
          const isDangerous = value?.toString().toLowerCase().includes('elevated') || 
                            value?.toString().toLowerCase().includes('present') ||
                            value?.toString().toLowerCase().includes('stage ii') ||
                            value?.toString().toLowerCase().includes('stage iii') ||
                            value?.toString().toLowerCase().includes('stage iv');

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg p-4 border ${
                isDangerous 
                  ? 'bg-red-50 border-danger' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <p className="text-sm text-gray-500 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className={`font-semibold ${isDangerous ? 'text-danger' : 'text-gray-800'}`}>
                {value || 'N/A'}
              </p>
              {isDangerous && (
                <div className="flex items-center gap-1 mt-2 text-xs text-danger">
                  <AlertCircle className="w-3 h-3" />
                  <span>Needs attention</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Summary Section - Shown to all */}
      <Card title="Summary" icon={FileText}>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </Card>

      {/* AI Insights - Expandable */}
      <div className="border rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('insights')}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-red/10 to-transparent hover:from-primary-red/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-red" />
            <span className="font-semibold text-gray-800">AI Insights</span>
          </div>
          {expandedSection === 'insights' ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {expandedSection === 'insights' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="p-4 bg-white"
          >
            <p className="text-gray-700 leading-relaxed">{aiInsights}</p>
          </motion.div>
        )}
      </div>

      {/* Recommendations */}
      <Card title="Recommendations" icon={CheckCircle}>
        <ul className="space-y-2">
          {recommendations.map((rec, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-2"
            >
              <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
              <span className="text-gray-700">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Patient Warning */}
      {!isDoctorOrAdmin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Important Notice</h4>
              <p className="text-sm text-gray-600">
                Some details are hidden until confirmed by your doctor. 
                Please consult with your healthcare provider for complete information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StructuredReport;

