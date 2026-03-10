import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', glass = false }) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`${glass ? 'glass-card' : 'bg-white'} relative w-full ${sizes[size]} rounded-3xl shadow-modern-xl border border-white/20 max-h-[90vh] overflow-hidden`}
            >
              {title && (
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                  <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
              <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

