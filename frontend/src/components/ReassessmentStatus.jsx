import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import Card from './ui/Card';

const ReassessmentStatus = ({ status = 'up-to-date', lastAssessment, nextReassessment }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'up-to-date':
        return {
          color: 'bg-success',
          bgColor: 'bg-green-50',
          borderColor: 'border-success',
          icon: CheckCircle,
          label: 'Up to Date',
          description: 'Your reassessment is scheduled'
        };
      case 'due':
        return {
          color: 'bg-warning',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-warning',
          icon: Clock,
          label: 'Due Soon',
          description: 'Schedule your reassessment'
        };
      case 'overdue':
        return {
          color: 'bg-danger',
          bgColor: 'bg-red-50',
          borderColor: 'border-danger',
          icon: AlertTriangle,
          label: 'Overdue',
          description: 'Please schedule immediately'
        };
      default:
        return {
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          icon: AlertCircle,
          label: 'Unknown',
          description: 'Contact your doctor'
        };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  // Calculate days remaining/overdue
  const today = new Date();
  const nextDate = new Date(nextReassessment);
  const daysDiff = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
  
  const isOverdue = daysDiff < 0;
  const daysText = isOverdue 
    ? `${Math.abs(daysDiff)} days overdue`
    : `${daysDiff} days remaining`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${config.bgColor} border-2 ${config.borderColor} rounded-xl p-6`}
    >
      <div className="flex items-start gap-4">
        <div className={`${config.color} p-3 rounded-full`}>
          <StatusIcon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-bold ${status === 'overdue' ? 'text-danger' : 'text-gray-800'}`}>
              {config.label}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${config.color}`}>
              {daysText}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{config.description}</p>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Last Assessment</span>
              </div>
              <p className="font-medium text-gray-800">
                {lastAssessment || 'Not recorded'}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Next Reassessment</span>
              </div>
              <p className={`font-medium ${isOverdue ? 'text-danger' : 'text-gray-800'}`}>
                {nextReassessment || 'Not scheduled'}
              </p>
            </div>
          </div>
          
          {status === 'due' || status === 'overdue' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-3 bg-primary-red text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Schedule Reassessment
            </motion.button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ReassessmentStatus;

