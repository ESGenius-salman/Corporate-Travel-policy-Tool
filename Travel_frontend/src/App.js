import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TripRequest from './pages/trip-request/TripRequest';
import Itinerary from './pages/itinerary/Itinerary';
import Safety from './pages/safety/Safety';
import Alerts from './pages/alerts/Alerts';
import Expenses from './pages/expenses/Expenses';
import ESGTracking from './pages/esg-tracking/ESGTracking';
import TripHistory from './pages/trip-history/TripHistory';
import TravelInsuranceVerification from './pages/travel-insurance/TravelInsuranceVerification';
import CovidHealthGuidelines from './pages/covid-guidelines/CovidHealthGuidelines';
import EmergencyContacts from './pages/emergency-contacts/EmergencyContacts';
import EmbassyDetails from './pages/embassy-details/EmbassyDetails';
import SafetyCompliance from './pages/safety-compliance/SafetyCompliance';
import RiskRatingDetails from './pages/risk-rating/RiskRatingDetails';
import DocumentManagement from './pages/document-management/DocumentManagement';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Loading...</div>
    </div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/trip-request" element={<TripRequest />} />
                  <Route path="/itinerary" element={<Itinerary />} />
                  <Route path="/safety" element={<Safety />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/esg-tracking" element={<ESGTracking />} />
                  <Route path="/trip-history" element={<TripHistory />} />
                  <Route path="/employee/travel-insurance-verification" element={<TravelInsuranceVerification />} />
                  <Route path="/employee/covid-health-guidelines" element={<CovidHealthGuidelines />} />
                  <Route path="/employee/emergency-contacts" element={<EmergencyContacts />} />
                  <Route path="/employee/embassy-details" element={<EmbassyDetails />} />
                  <Route path="/employee/safety-check" element={<Safety />} />
                  <Route path="/employee/dashboard" element={<Dashboard />} />
                  <Route path="/employee/safety-compliance" element={<SafetyCompliance />} />
                  <Route path="/risk-rating-details" element={<RiskRatingDetails />} />
                  <Route path="/employee/safety-compliance/risk-details" element={<RiskRatingDetails />} />
                  <Route path="/employee/safety-compliance/manage-contacts" element={<EmergencyContacts />} />
                  <Route path="/employee/document-management" element={<DocumentManagement />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;