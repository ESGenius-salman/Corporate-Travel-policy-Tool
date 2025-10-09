import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SafetyCompliance.css';

const SafetyCompliance = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1 className="page-title">Safety & Compliance</h1>
      <p className="page-subtitle">Manage safety and compliance aspects of corporate travel</p>

      <div className="safety-cards-grid">
        {/* Risk Rating System Card */}
        <div className="safety-card">
          <div className="safety-card-icon risk-icon">📊</div>
          <h2>Risk Rating System</h2>
          <p className="safety-card-description">
            Color-coded risk levels for destinations
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/risk-rating-details')}
          >
            View Details
          </button>
        </div>

        {/* Emergency Support Card */}
        <div className="safety-card">
          <div className="safety-card-icon emergency-icon">🆘</div>
          <h2>Emergency Support</h2>
          <ul className="safety-card-list">
            <li>24/7 helpline</li>
            <li>Quick access to company crisis teams</li>
          </ul>
          <button 
            className="btn-primary"
            onClick={() => navigate('/employee/emergency-contacts')}
          >
            Manage Contacts
          </button>
        </div>

        {/* Travel Insurance Card */}
        <div className="safety-card">
          <div className="safety-card-icon insurance-icon">🛡️</div>
          <h2>Travel Insurance</h2>
          <p className="safety-card-description">
            Verify and manage travel insurance policies
          </p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/employee/travel-insurance-verification')}
          >
            View Insurance
          </button>
        </div>

        {/* Document Management Card */}
        <div className="safety-card">
          <div className="safety-card-icon document-icon">📄</div>
          <h2>Document Management</h2>
          <ul className="safety-card-list">
            <li>Passport verification</li>
            <li>Visa tracking</li>
            <li>Health certificates</li>
          </ul>
          <button 
            className="btn-primary"
            onClick={() => navigate('/employee/document-management')}
          >
            Manage Documents
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyCompliance;
