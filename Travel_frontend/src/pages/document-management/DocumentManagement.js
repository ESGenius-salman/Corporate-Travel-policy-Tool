import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DocumentManagement.css";

const DocumentManagement = () => {
  const navigate = useNavigate();

  // Dynamic state
  const [documents, setDocuments] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateType, setCertificateType] = useState("");
  const [notes, setNotes] = useState("");

  const travelId = 1; // Replace with actual travelId from auth/user context

  // Fetch documents from backend
  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/documents/${travelId}`
      );
      // Transform array into object for easy access by type
      const docsObj = {};
      res.data.forEach((doc) => {
        docsObj[doc.type] = doc;
      });
      setDocuments(docsObj);
    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Check if a document is expiring within 6 months
  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry < 180;
  };

  // Upload handler
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !certificateType) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("travelId", travelId);
    formData.append("type", certificateType);

    try {
      await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadSuccess(true);
      fetchDocuments(); // refresh document list

      setTimeout(() => {
        setShowUploadModal(false);
        setUploadSuccess(false);
        setSelectedFile(null);
        setCertificateType("");
        setNotes("");
      }, 2000);
    } catch (err) {
      console.error("Error uploading document:", err);
    }
  };

  return (
    <div className="page-container">
      <button
        className="btn-back"
        onClick={() => navigate("/employee/safety-compliance")}
      >
        ← Back to Safety & Compliance
      </button>

      <h1 className="page-title">Document Management</h1>
      <p className="page-subtitle">
        Manage your travel documents and certifications
      </p>

      <div className="documents-grid">
        {/* Passport */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon passport-icon">🛂</div>
            <h2>Passport</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Passport Number:</span>
              <span className="info-value">
                {documents.passport?.number || "Not uploaded"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span
                className={`status-badge ${
                  documents.passport?.status?.toLowerCase() || "pending"
                }`}
              >
                {documents.passport?.status
                  ? `✓ ${documents.passport.status}`
                  : "⚠️ Pending"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">
                {documents.passport?.expiryDate || "N/A"}
              </span>
            </div>
            {isExpiringSoon(documents.passport?.expiryDate) && (
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

        {/* Visa */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon visa-icon">🌍</div>
            <h2>Visa ({documents.visa?.country || "-"})</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Country:</span>
              <span className="info-value">
                {documents.visa?.country || "N/A"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span
                className={`status-badge ${
                  documents.visa?.status?.toLowerCase() || "pending"
                }`}
              >
                {documents.visa?.status
                  ? `✓ ${documents.visa.status}`
                  : "⚠️ Pending"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">
                {documents.visa?.expiryDate || "N/A"}
              </span>
            </div>
            {isExpiringSoon(documents.visa?.expiryDate) && (
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

        {/* Health Certificate */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon health-icon">💉</div>
            <h2>Health Certificate</h2>
          </div>
          <div className="document-body">
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span
                className={`status-badge ${
                  documents.healthCertificate?.fileUrl ? "valid" : "pending"
                }`}
              >
                {documents.healthCertificate?.fileUrl
                  ? "✓ Uploaded"
                  : "⚠️ Not Uploaded"}
              </span>
            </div>
            <p className="document-description">
              Upload your health certificate including vaccination records and
              medical clearance for travel.
            </p>
          </div>
          <div className="document-actions">
            <button
              className="btn-primary"
              onClick={() => setShowUploadModal(true)}
            >
              Upload Certificate
            </button>
          </div>
        </div>

        {/* Additional Documents */}
        <div className="document-card">
          <div className="document-header">
            <div className="document-icon other-icon">📋</div>
            <h2>Additional Documents</h2>
          </div>
          <div className="document-body">
            <ul className="document-list">
              {documents.additionalDocuments?.length > 0 ? (
                documents.additionalDocuments.map((doc, idx) => (
                  <li key={idx}>{doc.type}</li>
                ))
              ) : (
                <>
                  <li>Travel authorization forms</li>
                  <li>COVID-19 test results</li>
                  <li>Travel insurance documents</li>
                  <li>Emergency contact forms</li>
                </>
              )}
            </ul>
          </div>
          <div className="document-actions">
            <button className="btn-secondary">View All</button>
            <button className="btn-secondary">Upload New</button>
          </div>
        </div>
      </div>

      {/* Checklist */}
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
        <div
          className="modal-overlay"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Upload Health Certificate</h2>
              <button
                className="close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                ×
              </button>
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
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <p className="file-info">
                      Accepted formats: PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Certificate Type</label>
                    <select
                      required
                      value={certificateType}
                      onChange={(e) => setCertificateType(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="vaccination">Vaccination Record</option>
                      <option value="medical">Medical Clearance</option>
                      <option value="covid">COVID-19 Certificate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea
                      rows="3"
                      placeholder="Add any additional notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setShowUploadModal(false)}
                    >
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
