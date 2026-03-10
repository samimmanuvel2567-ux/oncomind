import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  glass = false,
  ...props 
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="form-label">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-primary-green" />
          </div>
        )}
        <input
          className={`form-input ${Icon ? 'pl-12' : ''} ${error ? 'border-danger focus:ring-danger' : ''} ${glass ? 'glass' : ''}`}
          {...props}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-5 h-5 bg-danger rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-danger font-medium"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;

