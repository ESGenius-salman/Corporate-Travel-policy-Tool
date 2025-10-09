import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const navigate = useNavigate();
  
  const [documents] = useState({
    passport: {
      number: 'A1234567',
      status: 'Valid',
      expiry: '2028-06-10'
    },
    visa: {
      country: 'France',
      status: 'Valid',
      expiry: '2026-12-01'
    },
    healthCertificate: {
      uploaded: false
    }
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadCertificate = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    // Simulate file upload
    setUploadSuccess(true);
    setTimeout(() => {
      setShowUploadModal(false);
      setUploadSuccess(false);
    }, 2000);
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry < 180; // Less than 6 months
  };

  return (
    <div className="page-container">
      <button className="btn-back" onClick={() => navigate('/employee/safety-compliance')}>
        ← Back to Safety & Compliance
      </button>

      <h1 className="page-title">Document Management</h1>
      <p className="page-subtitle">Manage your travel documents and certifications</p>

      <div className="documents-grid">
        {/* Passport Card */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon passport-icon">🛂</div>
            <h2>Passport</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Passport Number:</span>
              <span className="info-value">{documents.passport.number}</span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${documents.passport.status.toLowerCase()}`}>
                ✓ {documents.passport.status}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">{documents.passport.expiry}</span>
            </div>
            {isExpiringSoon(documents.passport.expiry) && (
              <div className="warning-message">
                ⚠️ Passport expires in less than 6 months
              </div>
            )}
          </div>
          <div className="document-actions">
            <button className="btn-secondary">Update Details</button>
            <button className="btn-secondary">Upload Copy</button>
          </div>
        </div>

        {/* Visa Card */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon visa-icon">🌍</div>
            <h2>Visa ({documents.visa.country})</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Country:</span>
              <span className="info-value">{documents.visa.country}</span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${documents.visa.status.toLowerCase()}`}>
                ✓ {documents.visa.status}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">{documents.visa.expiry}</span>
            </div>
            {isExpiringSoon(documents.visa.expiry) && (
              <div className="warning-message">
                ⚠️ Visa expires in less than 6 months
              </div>
            )}
          </div>
          <div className="document-actions">
            <button className="btn-secondary">Update Details</button>
            <button className="btn-secondary">Upload Copy</button>
          </div>
        </div>

        {/* Health Certificate Card */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon health-icon">💉</div>
            <h2>Health Certificate</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${documents.healthCertificate.uploaded ? 'valid' : 'pending'}`}>
                {documents.healthCertificate.uploaded ? '✓ Uploaded' : '⚠️ Not Uploaded'}
              </span>
            </div>
            <p className="document-description">
              Upload your health certificate including vaccination records and medical clearance for travel.
            </p>
          </div>
          <div className="document-actions">
            <button 
              className="btn-primary"
              onClick={handleUploadCertificate}
            >
              Upload Certificate
            </button>
          </div>
        </div>

        {/* Additional Documents Card */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon other-icon">📋</div>
            <h2>Additional Documents</h2>
          </div>
          <div className="document-body">
            <ul className="document-list">
              <li>Travel authorization forms</li>
              <li>COVID-19 test results</li>
              <li>Travel insurance documents</li>
              <li>Emergency contact forms</li>
            </ul>
          </div>
          <div className="document-actions">
            <button className="btn-secondary">View All</button>
            <button className="btn-secondary">Upload New</button>
          </div>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="checklist-section">
        <h2>Travel Document Checklist</h2>
        <div className="checklist-items">
          <div className="checklist-item completed">
            <span className="check-icon">✓</span>
            <span>Valid passport (at least 6 months validity)</span>
          </div>
          <div className="checklist-item completed">
            <span className="check-icon">✓</span>
            <span>Visa for destination country</span>
          </div>
          <div className="checklist-item pending">
            <span className="check-icon">○</span>
            <span>Health certificate uploaded</span>
          </div>
          <div className="checklist-item pending">
            <span className="check-icon">○</span>
            <span>Travel insurance verified</span>
          </div>
          <div className="checklist-item pending">
            <span className="check-icon">○</span>
            <span>COVID-19 vaccination proof</span>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload Health Certificate</h2>
              <button className="close-btn" onClick={() => setShowUploadModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {uploadSuccess ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <p>Certificate uploaded successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleFileUpload}>
                  <div className="form-group">
                    <label>Select Certificate File</label>
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="file-info">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                  <div className="form-group">
                    <label>Certificate Type</label>
                    <select required>
                      <option value="">Select type</option>
                      <option value="vaccination">Vaccination Record</option>
                      <option value="medical">Medical Clearance</option>
                      <option value="covid">COVID-19 Certificate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea rows="3" placeholder="Add any additional notes..."></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      Upload
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
