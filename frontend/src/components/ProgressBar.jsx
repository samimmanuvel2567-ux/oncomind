import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  label, 
  showValue = true,
  color = 'primary',
  height = 'md',
  animated = true 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colors = {
    primary: 'bg-primary-green',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    gradient: 'bg-gradient-to-r from-primary-green to-accent-light'
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-5'
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showValue && (
            <span className="text-sm font-bold text-primary-dark">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`w-full ${heights[height]} bg-gray-200 rounded-full overflow-hidden`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        >
          {animated && (
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: 'linear' 
              }}
              className="h-full w-8 bg-white opacity-30 skew-x-12"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;

