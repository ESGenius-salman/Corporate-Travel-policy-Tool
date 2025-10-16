import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DocumentManagement.css";

const DocumentManagement = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [certificateType, setCertificateType] = useState("");
  const [notes, setNotes] = useState("");
  const [editDocType, setEditDocType] = useState("");
  const [editFormData, setEditFormData] = useState({
    number: "",
    expiryDate: "",
    country: "",
  });

  const travelId = 1; // replace with user/travelId context

  // Fetch documents
  const fetchDocuments = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/documents/${travelId}`);
    const docsObj = {};

    if (Array.isArray(res.data)) {
      res.data.forEach((doc) => {
        docsObj[doc.type] = doc;
      });
    } else if (typeof res.data === "object" && res.data !== null) {
      Object.keys(res.data).forEach((key) => {
        docsObj[key] = res.data[key];
      });
    }

    setDocuments(docsObj);
  } catch (err) {
    console.error("Error fetching documents:", err);
  }
};


  useEffect(() => {
    fetchDocuments();
  }, []);

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
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
      const res = await axios.post("http://localhost:5000/api/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadSuccess(true);

      // Update local state immediately
      setDocuments((prevDocs) => {
        if (["passport", "visa", "healthCertificate"].includes(certificateType)) {
          return {
            ...prevDocs,
            [certificateType]: res.data,
          };
        }

        const updatedAdditionalDocs = prevDocs.additionalDocuments
          ? [...prevDocs.additionalDocuments, res.data]
          : [res.data];

        return {
          ...prevDocs,
          additionalDocuments: updatedAdditionalDocs,
        };
      });

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

  // Open modals
  const handleUpdateDetails = (type) => {
    setEditDocType(type);
    setEditFormData({
      number: documents[type]?.number || "",
      expiryDate: documents[type]?.expiryDate || "",
      country: documents[type]?.country || "",
    });
    setShowUpdateModal(true);
  };

  const handleViewAll = () => {
    setShowViewAllModal(true);
  };

  const handleUploadCopy = (type) => {
    setCertificateType(type);
    setShowUploadModal(true);
  };

  const handleUploadNew = () => {
    setCertificateType("other");
    setShowUploadModal(true);
  };

  // Update details handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/documents/update/${editDocType}`, {
        ...editFormData,
        travelId,
      });

      setDocuments((prevDocs) => ({
        ...prevDocs,
        [editDocType]: res.data,
      }));

      setShowUpdateModal(false);
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };

  return (
    <div className="page-container">
      <button className="btn-back" onClick={() => navigate("/employee/safety-compliance")}>
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
              <span className="info-value">{documents.passport?.number || "Not uploaded"}</span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${documents.passport?.status?.toLowerCase() || "pending"}`}>
                {documents.passport?.status ? `✓ ${documents.passport.status}` : "⚠️ Pending"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">{documents.passport?.expiryDate || "N/A"}</span>
            </div>
            {isExpiringSoon(documents.passport?.expiryDate) && (
              <div className="warning-message">⚠️ Passport expires in less than 6 months</div>
            )}
          </div>
          <div className="document-actions">
            <button className="btn-secondary" onClick={() => handleUpdateDetails("passport")}>Update Details</button>
            <button className="btn-secondary" onClick={() => handleUploadCopy("passport")}>Upload Copy</button>
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
              <span className="info-value">{documents.visa?.country || "N/A"}</span>
            </div>
            <div className="document-info">
              <span className="info-label">Status:</span>
              <span className={`status-badge ${documents.visa?.status?.toLowerCase() || "pending"}`}>
                {documents.visa?.status ? `✓ ${documents.visa.status}` : "⚠️ Pending"}
              </span>
            </div>
            <div className="document-info">
              <span className="info-label">Expiry Date:</span>
              <span className="info-value">{documents.visa?.expiryDate || "N/A"}</span>
            </div>
            {isExpiringSoon(documents.visa?.expiryDate) && (
              <div className="warning-message">⚠️ Visa expires in less than 6 months</div>
            )}
          </div>
          <div className="document-actions">
            <button className="btn-secondary" onClick={() => handleUpdateDetails("visa")}>Update Details</button>
            <button className="btn-secondary" onClick={() => handleUploadCopy("visa")}>Upload Copy</button>
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
              <span className={`status-badge ${documents.healthCertificate?.fileUrl ? "valid" : "pending"}`}>
                {documents.healthCertificate?.fileUrl ? "✓ Uploaded" : "⚠️ Not Uploaded"}
              </span>
            </div>
            <p className="document-description">
              Upload your health certificate including vaccination records and medical clearance for travel.
            </p>
          </div>
          <div className="document-actions">
            <button className="btn-primary" onClick={() => handleUploadCopy("healthCertificate")}>Upload Certificate</button>
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
                documents.additionalDocuments.map((doc, idx) => <li key={idx}>{doc.type}</li>)
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
            <button className="btn-secondary" onClick={handleViewAll}>View All</button>
            <button className="btn-secondary" onClick={handleUploadNew}>Upload New</button>
          </div>
        </div>
      </div>

      {/* Update Details Modal */}
      {showUpdateModal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Update {editDocType} Details</h2>
            <form onSubmit={handleUpdateSubmit}>
              {editDocType === "passport" && (
                <>
                  <label>Passport Number</label>
                  <input type="text" value={editFormData.number} onChange={(e) => setEditFormData({...editFormData, number: e.target.value})} required />
                  <label>Expiry Date</label>
                  <input type="date" value={editFormData.expiryDate} onChange={(e) => setEditFormData({...editFormData, expiryDate: e.target.value})} required />
                </>
              )}
              {editDocType === "visa" && (
                <>
                  <label>Visa Country</label>
                  <input type="text" value={editFormData.country} onChange={(e) => setEditFormData({...editFormData, country: e.target.value})} required />
                  <label>Expiry Date</label>
                  <input type="date" value={editFormData.expiryDate} onChange={(e) => setEditFormData({...editFormData, expiryDate: e.target.value})} required />
                </>
              )}
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View All Modal */}
      {showViewAllModal && (
        <div className="modal-overlay" onClick={() => setShowViewAllModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>All Uploaded Documents</h2>
            {Object.keys(documents).length === 0 ? <p>No documents found.</p> : (
              <ul>
                {Object.entries(documents).map(([key, doc]) => (
                  <li key={key}>
                    <strong>{key}</strong> — {doc.fileUrl ? <a href={`http://localhost:5000${doc.fileUrl}`} target="_blank" rel="noreferrer">View File</a> : "Not Uploaded"}
                  </li>
                ))}
              </ul>
            )}
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowViewAllModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

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
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </div>
                  <div className="form-group">
                    <label>Certificate Type</label>
                    <select required value={certificateType} onChange={(e) => setCertificateType(e.target.value)}>
                      <option value="">Select type</option>
                      <option value="vaccination">Vaccination Record</option>
                      <option value="medical">Medical Clearance</option>
                      <option value="covid">COVID-19 Certificate</option>
                      <option value="passport">Passport</option>
                      <option value="visa">Visa</option>
                      <option value="healthCertificate">Health Certificate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes (Optional)</label>
                    <textarea rows="3" placeholder="Add any notes..." value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                    <button type="submit" className="btn-primary">Upload</button>
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
