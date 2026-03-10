import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { mockPatients } from '../../utils/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const DoctorPatients = () => {
  const { t } = useTranslation();
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  const getRiskBadge = (level) => {
    switch (level) {
      case 'high':
        return { color: 'bg-danger', text: 'text-white', label: 'High' };
      case 'medium':
        return { color: 'bg-warning', text: 'text-gray-800', label: 'Medium' };
      case 'low':
        return { color: 'bg-success', text: 'text-white', label: 'Low' };
      default:
        return { color: 'bg-gray-500', text: 'text-white', label: 'Unknown' };
    }
  };

  const getReassessmentBadge = (status) => {
    switch (status) {
      case 'up-to-date':
        return { color: 'bg-success/20 text-success', label: 'Up to Date' };
      case 'due':
        return { color: 'bg-warning/20 text-warning', label: 'Due' };
      case 'overdue':
        return { color: 'bg-danger/20 text-danger', label: 'Overdue' };
      default:
        return { color: 'bg-gray-200 text-gray-600', label: 'Unknown' };
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || patient.riskLevel === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('patients')}</h1>
          <p className="text-gray-600">
            View and manage all assigned patients
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" icon={Filter}>
            Filter
          </Button>
          <Button variant="primary" icon={Users}>
            Add Patient
          </Button>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-red"
          >
            <option value="all">All Risks</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>
      </Card>

      {/* Patient List */}
      <div className="space-y-4">
        {filteredPatients.map((patient, index) => {
          const riskBadge = getRiskBadge(patient.riskLevel);
          const reassessmentBadge = getReassessmentBadge(patient.reassessmentStatus);
          
          return (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="cursor-pointer">
                <Link to={`/doctor/patient/${patient.id}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Patient Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-red/10 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-primary-red">
                          {patient.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-500">
                          {patient.age} years • {patient.gender}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6">
                      {/* Risk Score */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Risk Score</p>
                        <div className={`px-3 py-1 rounded-full ${riskBadge.color} ${riskBadge.text} font-bold`}>
                          {patient.riskScore}
                        </div>
                      </div>

                      {/* RPI */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">RPI</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="font-semibold text-gray-800">{patient.rpi}</span>
                        </div>
                      </div>

                      {/* Reassessment */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Reassessment</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${reassessmentBadge.color}`}>
                          {reassessmentBadge.label}
                        </span>
                      </div>

                      {/* Alert */}
                      {patient.riskLevel === 'high' && (
                        <div className="p-2 bg-danger/10 rounded-lg animate-pulse">
                          <AlertTriangle className="w-5 h-5 text-danger" />
                        </div>
                      )}

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          );
        })}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Patients Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;

