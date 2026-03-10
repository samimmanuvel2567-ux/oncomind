import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  icon: Icon,
  loading = false,
  glass = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variants = {
    primary: `${glass ? 'glass' : 'bg-gradient-to-r from-primary-green to-primary-dark'} text-white hover:shadow-modern-lg hover:scale-105 focus:ring-primary-green`,
    secondary: 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white focus:ring-primary-green bg-white/80 backdrop-blur-sm',
    success: 'bg-gradient-to-r from-success to-emerald-600 text-white hover:shadow-modern-lg hover:scale-105 focus:ring-success',
    warning: 'bg-gradient-to-r from-warning to-amber-600 text-white hover:shadow-modern-lg hover:scale-105 focus:ring-warning',
    danger: 'bg-gradient-to-r from-danger to-red-600 text-white hover:shadow-modern-lg hover:scale-105 focus:ring-danger',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:ring-gray-300'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100' : '';
  
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
      
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && !loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      )}
    </motion.button>
  );
};

export default Button;

