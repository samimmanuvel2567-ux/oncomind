import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';

const RiskGauge = ({ score = 0, level = 'low', showDetails = true, size = 'md' }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return '#DC3545';
      case 'medium': return '#FFD700';
      case 'low': return '#228B22';
      default: return '#228B22';
    }
  };

  const getRiskLabel = (level) => {
    switch (level) {
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Unknown';
    }
  };

  const colors = ['#228B22', '#FFD700', '#DC3545'];
  const data = [
    { name: 'Low', value: level === 'low' ? score : 30 },
    { name: 'Medium', value: level === 'medium' ? score : 30 },
    { name: 'High', value: level === 'high' ? score : 40 },
  ];

  const sizes = {
    sm: { width: 150, height: 150 },
    md: { width: 200, height: 200 },
    lg: { width: 280, height: 280 },
  };

  const { width, height } = sizes[size];
  const riskColor = getRiskColor(level);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Background arc */}
            <Pie
              data={[
                { name: 'background', value: 100, fill: '#f0f0f0' }
              ]}
              innerRadius="70%"
              outerRadius="100%"
              dataKey="value"
              startAngle={180}
              endAngle={0}
            />
            {/* Risk score arc */}
            <Pie
              data={[
                { name: 'score', value: score, fill: riskColor }
              ]}
              innerRadius="70%"
              outerRadius="100%"
              dataKey="value"
              startAngle={180}
              endAngle={180 - (score * 1.8)}
              animationDuration={1500}
              animationBegin={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={riskColor} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold"
            style={{ color: riskColor }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      {/* Risk Level Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 px-4 py-2 rounded-full text-white font-medium flex items-center gap-2`}
        style={{ backgroundColor: riskColor }}
      >
        {level === 'high' && <AlertTriangle className="w-4 h-4" />}
        {getRiskLabel(level)}
      </motion.div>

      {/* Details */}
      {showDetails && (
        <div className="mt-6 w-full max-w-xs">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            <span>Score Breakdown</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Symptoms', value: 40, contribution: score * 0.4 },
              { name: 'History', value: 30, contribution: score * 0.3 },
              { name: 'Lifestyle', value: 20, contribution: score * 0.2 },
              { name: 'Age', value: 10, contribution: score * 0.1 },
            ].map((factor, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-20">{factor.name}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                    className="h-full bg-primary-red rounded-full"
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{factor.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskGauge;

