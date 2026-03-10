import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Disclaimer = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`disclaimer-box bg-green-50 border-l-4 border-primary-green ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-primary-green flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-primary-green mb-1">Medical Disclaimer</h4>
          <p className="text-sm text-gray-700">
            This is <strong>NOT</strong> medical advice or diagnosis. 
            Consult a licensed physician before making any health decisions. 
            This is a <strong>prototype</strong> using synthetic data only.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Disclaimer;

