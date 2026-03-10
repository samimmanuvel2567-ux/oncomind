import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Scan, 
  Upload, 
  AlertTriangle, 
  CheckCircle,
  Info,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockSkinAnalysis } from '../../utils/mockData';
import { uploadSkinImage } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const PatientSkinCheck = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    
    setAnalyzing(true);
    try {
      // Simulate API call
      const response = await uploadSkinImage(image);
      setResults(response.data);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success bg-green-100';
      case 'medium': return 'text-warning bg-yellow-100';
      case 'high': return 'text-danger bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('skinCheck')}</h1>
        <p className="text-gray-600">
          Upload images of skin lesions or moles for AI-powered analysis. 
          For best results, use clear, well-lit photos.
        </p>
      </motion.div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This is a screening tool only and does NOT provide diagnoses. 
            Always consult a dermatologist for proper evaluation.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      {!image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-red hover:bg-red-50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Upload Skin Image
          </h3>
          <p className="text-gray-500 mb-4">
            Drag and drop or click to select
          </p>
          <p className="text-sm text-gray-400">
            Supported formats: JPG, PNG (Max 10MB)
          </p>
        </motion.div>
      )}

      {/* Image Preview */}
      {image && !results && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-1">
                <div className="relative rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt="Skin analysis"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Image uploaded successfully
                </p>
              </div>

              {/* Analysis Info */}
              <div className="flex-1 space-y-4">
                <h3 className="font-semibold text-gray-800">Ready for Analysis</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Image quality: Good
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Format: Supported
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    AI will analyze for ABCDE criteria
                  </li>
                </ul>

                {analyzing ? (
                  <div className="py-8">
                    <Spinner size="lg" text="Analyzing image..." />
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    icon={Scan}
                    onClick={handleAnalyze}
                    className="w-full"
                  >
                    Start Analysis
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Risk Assessment */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Analysis Results</h3>
              <span className={`px-4 py-2 rounded-full font-medium ${getRiskColor(results.riskAssessment)}`}>
                {results.riskAssessment.toUpperCase()} RISK
              </span>
            </div>

            {/* ABCDE Analysis */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(results.analysis).map(([key, value]) => (
                <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase mb-1">{key}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Confidence */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-800">AI Confidence</span>
              </div>
              <span className="text-xl font-bold text-blue-600">{results.confidence}%</span>
            </div>
          </Card>

          {/* Recommendations */}
          <Card title="Recommendations" icon={CheckCircle}>
            <ul className="space-y-3">
              {results.recommendations.map((rec, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="secondary"
              icon={RefreshCw}
              onClick={handleReset}
              className="flex-1"
            >
              Analyze Another Image
            </Button>
            <Button
              variant="primary"
              className="flex-1"
            >
              Save Results
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PatientSkinCheck;

