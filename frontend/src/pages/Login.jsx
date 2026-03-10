import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, User, Stethoscope, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'patient',
      name: 'Patient',
      description: 'Track symptoms, upload reports, monitor your health',
      icon: User,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      description: 'Manage patients, view alerts, recommend tests',
      icon: Stethoscope,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'View analytics, manage users, monitor system',
      icon: Shield,
      color: 'from-green-600 to-emerald-700'
    }
  ];

  const handleLogin = async () => {
    if (!selectedRole) return;
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = login(selectedRole);
    
    if (result.success) {
      // Redirect based on role
      switch (selectedRole) {
        case 'patient':
          navigate('/patient');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary-green/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-green-200/30 to-primary-green/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-green via-emerald-500 to-teal-600 rounded-3xl shadow-2xl mb-8 relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-sm"></div>
            <Activity className="w-12 h-12 text-white relative z-10" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl font-bold bg-gradient-to-r from-primary-green via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
          >
            OncoMind
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600 text-xl font-medium"
          >
            AI-Assisted Cancer Care Decision Support
          </motion.p>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-10 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">⚠️</span>
            </div>
            <p className="text-sm text-amber-800 font-medium text-center">
              <strong>Medical Disclaimer:</strong> This is a prototype for demonstration purposes only.
              It uses synthetic data and does not provide real medical advice.
              Always consult a licensed healthcare provider.
            </p>
          </div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 bg-gradient-to-r from-primary-green to-emerald-600 bg-clip-text text-transparent">
            Choose Your Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + (0.1 * index), duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role.id)}
                className={`group p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  selectedRole === role.id
                    ? 'border-primary-green bg-gradient-to-br from-green-50 to-emerald-50 shadow-2xl transform scale-105'
                    : 'border-gray-200 bg-white/80 hover:border-primary-green hover:shadow-xl hover:bg-green-50/50'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <role.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="relative text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-green transition-colors">{role.name}</h3>
                <p className="relative text-sm text-gray-600 leading-relaxed">{role.description}</p>

                {selectedRole === role.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-6 h-6 bg-primary-green rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm">✓</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
                  <motion.div
                    layoutId="selectedIndicator"
                    className="mt-4 w-full h-1 bg-primary-red rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleLogin}
            disabled={!selectedRole}
            loading={loading}
            className="px-16 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Authenticating...
              </div>
            ) : (
              'Continue to Dashboard'
            )}
          </Button>

          {!selectedRole && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full inline-block"
            >
              Please select a role to continue
            </motion.p>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-sm text-gray-600 font-medium">© 2024 OncoMind. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1">AI-Powered Cancer Care Decision Support</p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Prototype Version 1.0</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;

