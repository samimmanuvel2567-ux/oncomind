import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  title, 
  icon: Icon,
  className = '',
  hover = true,
  glass = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)"
      } : {}}
      className={`
        ${glass ? 'glass-card' : 'bg-white'}
        rounded-2xl shadow-modern border border-white/20
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
        transition-all duration-300
      `}
      onClick={onClick}
      {...props}
    >
      {(title || Icon) && (
        <div className="px-8 py-6 border-b border-gray-100/50 flex items-center gap-4">
          {Icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          {title && (
            <div>
              <h3 className="text-xl font-bold text-gray-800">{title}</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary-green to-emerald-400 rounded-full mt-1"></div>
            </div>
          )}
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;

