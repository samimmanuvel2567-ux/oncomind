import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Plus, 
  Trash2, 
  Mic,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { symptomCategories } from '../../utils/mockData';
import { submitSymptoms } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PatientSymptoms = () => {
  const { t } = useTranslation();
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [customSymptoms, setCustomSymptoms] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => {
      const newState = { ...prev };
      if (newState[symptomId]) {
        delete newState[symptomId];
      } else {
        newState[symptomId] = { severity: 3, duration: '1 week' };
      }
      return newState;
    });
  };

  const updateSymptom = (symptomId, field, value) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomId]: { ...prev[symptomId], [field]: value }
    }));
  };

  const addCustomSymptom = () => {
    setCustomSymptoms([...customSymptoms, { id: Date.now(), name: '', severity: 3, duration: '1 week' }]);
  };

  const removeCustomSymptom = (id) => {
    setCustomSymptoms(customSymptoms.filter(s => s.id !== id));
  };

  const updateCustomSymptom = (id, field, value) => {
    setCustomSymptoms(customSymptoms.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // In production, process the voice input
        console.log('Voice input:', transcript);
      };
      
      recognition.start();
    } else {
      alert('Voice input not supported in this browser');
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedSymptoms).length === 0 && customSymptoms.length === 0) return;
    
    setSubmitting(true);
    
    try {
      // Format symptoms data for backend
      const symptomsData = [];
      
      // Add selected symptoms
      Object.entries(selectedSymptoms).forEach(([symptomId, data]) => {
        const symptom = symptomCategories.flatMap(cat => cat.symptoms).find(s => s.id === parseInt(symptomId));
        if (symptom) {
          symptomsData.push({
            name: symptom.name,
            intensity: data.severity,
            duration: data.duration
          });
        }
      });
      
      // Add custom symptoms
      customSymptoms.forEach(symptom => {
        if (symptom.name.trim()) {
          symptomsData.push({
            name: symptom.name.trim(),
            intensity: symptom.severity,
            duration: symptom.duration
          });
        }
      });
      
      await submitSymptoms({ symptoms: symptomsData });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting symptoms:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const severityLevels = [
    { value: 1, label: 'Mild', color: 'text-green-600' },
    { value: 2, label: 'Moderate', color: 'text-yellow-600' },
    { value: 3, label: 'Severe', color: 'text-orange-600' },
    { value: 4, label: 'Critical', color: 'text-red-600' }
  ];

  const durations = ['1 day', '1 week', '2 weeks', '1 month', '2+ months'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('symptoms')}</h1>
        <p className="text-gray-600">
          Select all symptoms you're currently experiencing. Be honest and thorough for accurate assessment.
        </p>
      </motion.div>

      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
        >
          <CheckCircle className="w-6 h-6 text-success" />
          <span className="text-green-800 font-medium">Symptoms recorded successfully!</span>
        </motion.div>
      )}

      {/* Symptom Categories */}
      {symptomCategories.map((category, catIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIndex * 0.1 }}
        >
          <Card title={category.category} icon={Activity}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.symptoms.map((symptom) => {
                const isSelected = !!selectedSymptoms[symptom.id];
                return (
                  <motion.div
                    key={symptom.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${isSelected 
                        ? 'border-primary-red bg-red-50' 
                        : 'border-gray-200 hover:border-red-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{symptom.icon}</span>
                        <span className="font-medium text-gray-800">{symptom.name}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-5 h-5 text-primary-red" />}
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-3"
                      >
                        {/* Severity Slider */}
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Severity</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4].map(level => (
                              <button
                                key={level}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateSymptom(symptom.id, 'severity', level);
                                }}
                                className={`
                                  flex-1 py-1 rounded text-xs font-medium
                                  ${selectedSymptoms[symptom.id]?.severity === level
                                    ? severityLevels[level-1].color + ' bg-white'
                                    : 'bg-gray-100 text-gray-500'
                                  }
                                `}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Duration */}
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Duration</label>
                          <select
                            onChange={(e) => {
                              e.stopPropagation();
                              updateSymptom(symptom.id, 'duration', e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-sm border border-gray-300 rounded p-1"
                            value={selectedSymptoms[symptom.id]?.duration || '1 week'}
                          >
                            {durations.map(d => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Custom Symptoms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card title="Other Symptoms">
          <div className="space-y-3">
            {customSymptoms.map((symptom) => (
              <div key={symptom.id} className="flex gap-3 items-start">
                <input
                  type="text"
                  placeholder="Symptom name"
                  value={symptom.name}
                  onChange={(e) => updateCustomSymptom(symptom.id, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={symptom.severity}
                  onChange={(e) => updateCustomSymptom(symptom.id, 'severity', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {[1,2,3,4].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <select
                  value={symptom.duration}
                  onChange={(e) => updateCustomSymptom(symptom.id, 'duration', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {durations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <button
                  onClick={() => removeCustomSymptom(symptom.id)}
                  className="p-2 text-gray-400 hover:text-danger"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            
            <Button
              variant="secondary"
              icon={Plus}
              onClick={addCustomSymptom}
            >
              Add Custom Symptom
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Voice Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Voice Input</h3>
              <p className="text-sm text-gray-500">Describe your symptoms verbally</p>
            </div>
            <Button
              variant={isRecording ? 'danger' : 'secondary'}
              icon={Mic}
              onClick={handleVoiceInput}
              className={isRecording ? 'animate-pulse' : ''}
            >
              {isRecording ? 'Recording...' : 'Record'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="sticky bottom-4"
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="text-sm text-gray-600">
                {Object.keys(selectedSymptoms).length + customSymptoms.length} symptoms selected
              </span>
            </div>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={submitting}
              disabled={Object.keys(selectedSymptoms).length === 0 && customSymptoms.length === 0}
            >
              Submit Symptoms
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientSymptoms;

