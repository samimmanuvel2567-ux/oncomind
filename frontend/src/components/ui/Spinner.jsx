import React from 'react';
import { motion } from 'framer-motion';

const Spinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} border-4 border-gray-200 border-t-primary-red rounded-full`}
      />
      {text && (
        <p className="text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default Spinner;

