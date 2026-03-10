import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, History, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ReportUploader from '../../components/ReportUploader';
import StructuredReport from '../../components/StructuredReport';
import { mockStructuredReport } from '../../utils/mockData';

const PatientReports = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upload');
  const [processedReport, setProcessedReport] = useState(null);
  const [uploadHistory] = useState([
    { id: 1, name: 'Blood Test Report', date: '2024-01-15', type: 'Blood Test' },
    { id: 2, name: 'CT Scan Results', date: '2024-01-10', type: 'Imaging' },
  ]);

  const handleReportProcessed = (report) => {
    setProcessedReport(report);
    setActiveTab('view');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('reports')}</h1>
        <p className="text-gray-600">
          Upload your medical reports for AI-powered structuring and analysis
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'upload'
              ? 'text-primary-red border-b-2 border-primary-red'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Upload className="w-4 h-4 inline-block mr-2" />
          {t('uploadReport')}
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'view'
              ? 'text-primary-red border-b-2 border-primary-red'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4 inline-block mr-2" />
          {t('structuredReport')}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-primary-red border-b-2 border-primary-red'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <History className="w-4 h-4 inline-block mr-2" />
          History
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {activeTab === 'upload' && (
          <Card>
            <ReportUploader onReportProcessed={handleReportProcessed} />
          </Card>
        )}

        {activeTab === 'view' && (
          <Card>
            {processedReport ? (
              <StructuredReport report={processedReport} />
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Report Available
                </h3>
                <p className="text-gray-500 mb-4">
                  Upload a medical report to see structured analysis
                </p>
                <Button
                  variant="primary"
                  onClick={() => setActiveTab('upload')}
                >
                  Upload Report
                </Button>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'history' && (
          <Card>
            {uploadHistory.length > 0 ? (
              <div className="space-y-3">
                {uploadHistory.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setProcessedReport(mockStructuredReport);
                      setActiveTab('view');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-red/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary-red" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{report.name}</p>
                        <p className="text-sm text-gray-500">{report.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  No Upload History
                </h3>
                <p className="text-gray-500">
                  Your uploaded reports will appear here
                </p>
              </div>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default PatientReports;

