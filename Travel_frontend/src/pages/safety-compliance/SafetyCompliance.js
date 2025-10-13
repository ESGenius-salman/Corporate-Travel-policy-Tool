import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SafetyCompliance.css';

const SafetyCompliance = () => {
  const navigate = useNavigate();

  const [riskGuidelines, setRiskGuidelines] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [travelInsurances, setTravelInsurances] = useState([]);
  const [documents, setDocuments] = useState([]);

  const travelId = 1; // Replace with actual travelId from auth/user context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alertsRes, sosRes, checkinRes, documentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/safety/alerts'),
          axios.get('http://localhost:5000/api/safety/sos'),
          axios.get('http://localhost:5000/api/safety/checkin'),
          axios.get(`http://localhost:5000/api/documents/${travelId}`),
        ]);

        setRiskGuidelines(alertsRes.data);
        setEmergencyContacts(sosRes.data);
        setTravelInsurances(checkinRes.data);
        setDocuments(documentsRes.data);
      } catch (err) {
        console.error(
          'Error fetching safety data:',
          err.response?.status,
          err.message
        );
      }
    };

    fetchData();
  }, [travelId]);

  return (
    <div className="page-container">
      <h1 className="page-title">Safety & Compliance</h1>
      <p className="page-subtitle">
        Manage safety and compliance aspects of corporate travel
      </p>

      <div className="safety-cards-grid">
        {/* Risk Rating */}
        <div className="safety-card risk-card">
          <div className="safety-card-icon">📊</div>
          <h2>Risk Rating System</h2>
          <button
            className="btn-primary"
            onClick={() => navigate('/risk-rating-details')}
          >
            View Details
          </button>
        </div>

        {/* Emergency Support */}
        <div className="safety-card emergency-card">
          <div className="safety-card-icon">🆘</div>
          <h2>Emergency Support</h2>
          <button
            className="btn-primary"
            onClick={() => navigate('/employee/emergency-contacts')}
          >
            Manage Contacts
          </button>
        </div>

        {/* Travel Insurance Verification */}
        <div className="safety-card insurance-card">
          <div className="safety-card-icon">🛡️</div>
          <h2>Travel Insurance</h2>
          <button
            className="btn-primary"
            onClick={() =>
              navigate('/employee/travel-insurance-verification')
            }
          >
            View Insurance
          </button>
        </div>

        {/* Document Management */}
        <div className="safety-card document-card">
          <div className="safety-card-icon">📄</div>
          <h2>Document Management</h2>
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
