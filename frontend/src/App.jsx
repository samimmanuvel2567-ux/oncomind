import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import Chatbot from './components/Chatbot';

// Pages
import Login from './pages/Login';

// Patient Pages
import PatientHome from './pages/patient/PatientHome';
import PatientSymptoms from './pages/patient/PatientSymptoms';
import PatientSkinCheck from './pages/patient/PatientSkinCheck';
import PatientReports from './pages/patient/PatientReports';
import PatientDashboard from './pages/patient/PatientDashboard';

// Doctor Pages
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorAlerts from './pages/doctor/DoctorAlerts';
import DoctorPatientDetail from './pages/doctor/DoctorPatientDetail';

// Admin Pages
import AdminHome from './pages/admin/AdminHome';
import AdminStats from './pages/admin/AdminStats';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMonitoring from './pages/admin/AdminMonitoring';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-tint">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${user?.role}`} replace />;
  }

  return children;
};

// Layout with Navbar
const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background-tint">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Disclaimer />
        {children}
      </main>
      <Chatbot />
    </div>
  );
};

function App() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect to appropriate dashboard if already logged in
  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'patient': return '/patient';
      case 'doctor': return '/doctor';
      case 'admin': return '/admin';
      default: return '/login';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Login />} 
      />

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <AppLayout>
              <PatientHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/symptoms"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <AppLayout>
              <PatientSymptoms />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/skin-check"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <AppLayout>
              <PatientSkinCheck />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/reports"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <AppLayout>
              <PatientReports />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <AppLayout>
              <PatientDashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <AppLayout>
              <DoctorHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <AppLayout>
              <DoctorPatients />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/alerts"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <AppLayout>
              <DoctorAlerts />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patient/:id"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <AppLayout>
              <DoctorPatientDetail />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/analytics"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <AppLayout>
              <DoctorHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AppLayout>
              <AdminHome />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stats"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AppLayout>
              <AdminStats />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AppLayout>
              <AdminUsers />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/monitoring"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AppLayout>
              <AdminMonitoring />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

