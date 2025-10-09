/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SafetyCompliance.css';

const SafetyCompliance = () => {
  const navigate = useNavigate();

  // Fetch data from backend APIs (optional for future use)
  const [riskGuidelines, setRiskGuidelines] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [travelInsurances, setTravelInsurances] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidelinesRes, contactsRes, insuranceRes, documentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/healthsafety/covid-guidelines'),
          axios.get('http://localhost:5000/api/healthsafety/emergencies'),
          axios.get('http://localhost:5000/api/healthsafety/travel-insurance'),
          axios.get('http://localhost:5000/api/healthsafety/documents'),
        ]);

        setRiskGuidelines(guidelinesRes.data);
        setEmergencyContacts(contactsRes.data);
        setTravelInsurances(insuranceRes.data);
        setDocuments(documentsRes.data);
      } catch (err) {
        console.error('Error fetching KPI data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Safety & Compliance</h1>
      <p className="page-subtitle">Manage safety and compliance aspects of corporate travel</p>

      <div className="safety-cards-grid">

        {/* Risk Rating System }
        <div className="safety-card risk-card">
          <div className="safety-card-icon">📊</div>
          <h2>Risk Rating System</h2>
          <button className="btn-primary" onClick={() => navigate('/risk-rating-details')}>
            View Details
          </button>
        </div>

        {/* Emergency Support }
        <div className="safety-card emergency-card">
          <div className="safety-card-icon">🆘</div>
          <h2>Emergency Support</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/emergency-contacts')}>
            Manage Contacts
          </button>
        </div>

        {/* Travel Insurance }
        <div className="safety-card insurance-card">
          <div className="safety-card-icon">🛡️</div>
          <h2>Travel Insurance</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/travel-insurance-verification')}>
            View Insurance
          </button>
        </div>

        {/* Document Management }
        <div className="safety-card document-card">
          <div className="safety-card-icon">📄</div>
          <h2>Document Management</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/document-management')}>
            Manage Documents
          </button>
        </div>

      </div>
    </div>
  );
};

export default SafetyCompliance;
*/
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

        {/* Risk Rating System */}
        <div className="safety-card risk-card">
          <div className="safety-card-icon">📊</div>
          <h2>Risk Rating System</h2>
          <button className="btn-primary" onClick={() => navigate('/risk-rating-details')}>
            View Details
          </button>
        </div>

        {/* Emergency Support */}
        <div className="safety-card emergency-card">
          <div className="safety-card-icon">🆘</div>
          <h2>Emergency Support</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/emergency-contacts')}>
            Manage Contacts
          </button>
        </div>

        {/* Travel Insurance */}
        <div className="safety-card insurance-card">
          <div className="safety-card-icon">🛡️</div>
          <h2>Travel Insurance</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/travel-insurance-verification')}>
            View Insurance
          </button>
        </div>

        {/* Document Management */}
        <div className="safety-card document-card">
          <div className="safety-card-icon">📄</div>
          <h2>Document Management</h2>
          <button className="btn-primary" onClick={() => navigate('/employee/document-management')}>
            Manage Documents
          </button>
        </div>

      </div>
    </div>
  );
};

export default SafetyCompliance;
