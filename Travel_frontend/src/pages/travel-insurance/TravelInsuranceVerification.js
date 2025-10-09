import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelInsuranceVerification.css';

const TravelInsuranceVerification = () => {
  const navigate = useNavigate();
  const [savedEntries, setSavedEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    department: '',
    insuranceProvider: '',
    policyNumber: '',
    policyType: '',
    coverageType: '',
    destinationCoverage: '',
    coverageStartDate: '',
    coverageEndDate: '',
    premiumAmount: '',
    insuranceHelpline: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('insuranceEntries');
    if (saved) {
      setSavedEntries(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEntries;

    if (editingIndex !== null) {
      updatedEntries = savedEntries.map((entry, index) =>
        index === editingIndex ? { ...formData, updatedAt: new Date().toISOString() } : entry
      );
      alert('Insurance record updated successfully!');
    } else {
      updatedEntries = [...savedEntries, { ...formData, submittedAt: new Date().toISOString() }];
      alert('Insurance record added successfully!');
    }

    setSavedEntries(updatedEntries);
    localStorage.setItem('insuranceEntries', JSON.stringify(updatedEntries));
    setShowForm(false);
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', fullName: '', department: '', insuranceProvider: '', policyNumber: '',
      policyType: '', coverageType: '', destinationCoverage: '', coverageStartDate: '', coverageEndDate: '',
      premiumAmount: '', insuranceHelpline: '', emergencyContactName: '', emergencyContactPhone: '', notes: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(savedEntries[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this insurance record?')) {
      const updatedEntries = savedEntries.filter((_, i) => i !== index);
      setSavedEntries(updatedEntries);
      localStorage.setItem('insuranceEntries', JSON.stringify(updatedEntries));
      alert('Insurance record deleted successfully!');
    }
  };

  const getExpiryStatus = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry <= 30) return 'Expiring Soon';
    return 'Active';
  };

  const handleBack = () => {
    navigate('/employee/safety-check');
  };

  return (
    <div className="travel-insurance-verification">
      <div className="page-header">
        <h1>🛡️ Travel Insurance Verification</h1>
        <p>Manage your travel insurance policies and coverage details</p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{savedEntries.length}</span>
          <span className="stat-label">Total Policies</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{savedEntries.filter(i => getExpiryStatus(i.coverageEndDate) === 'Active').length}</span>
          <span className="stat-label">Active</span>
        </div>
      </div>

      <div className="actions-bar">
        <button className="add-btn" onClick={() => { setShowForm(true); setEditingIndex(null); resetForm(); }}>
          ➕ Add New Insurance Policy
        </button>
        <button className="back-button" onClick={handleBack}>← Back to Safety</button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingIndex !== null ? 'Edit Insurance Policy' : 'Add New Insurance Policy'}</h2>
            <button className="close-btn" onClick={() => { setShowForm(false); setEditingIndex(null); resetForm(); }}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>Employee ID *
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
              </label>
              <label>Full Name *
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </label>
              <label>Department
                <input type="text" name="department" value={formData.department} onChange={handleChange} />
              </label>
              <label>Insurance Provider *
                <input type="text" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} required />
              </label>
              <label>Policy Number *
                <input type="text" name="policyNumber" value={formData.policyNumber} onChange={handleChange} required />
              </label>
              <label>Policy Type
                <select name="policyType" value={formData.policyType} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Individual">Individual</option>
                  <option value="Family">Family</option>
                  <option value="Group">Group</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </label>
              <label>Coverage Type *
                <select name="coverageType" value={formData.coverageType} onChange={handleChange} required>
                  <option value="">Select Coverage</option>
                  <option value="Basic">Basic</option>
                  <option value="Comprehensive">Comprehensive</option>
                  <option value="Premium">Premium</option>
                </select>
              </label>
              <label>Destination Coverage
                <input type="text" name="destinationCoverage" value={formData.destinationCoverage} onChange={handleChange} placeholder="e.g., Worldwide, Asia" />
              </label>
              <label>Coverage Start Date *
                <input type="date" name="coverageStartDate" value={formData.coverageStartDate} onChange={handleChange} required />
              </label>
              <label>Coverage End Date *
                <input type="date" name="coverageEndDate" value={formData.coverageEndDate} onChange={handleChange} required />
              </label>
              <label>Premium Amount
                <input type="number" name="premiumAmount" value={formData.premiumAmount} onChange={handleChange} placeholder="0.00" step="0.01" />
              </label>
              <label>Insurance Helpline
                <input type="text" name="insuranceHelpline" value={formData.insuranceHelpline} onChange={handleChange} />
              </label>
              <label>Emergency Contact Name
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} />
              </label>
              <label>Emergency Contact Phone
                <input type="text" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} />
              </label>
            </div>
            <label>Notes
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
            </label>
            <button type="submit" className="submit-btn">{editingIndex !== null ? 'Update Policy' : 'Add Policy'}</button>
          </form>
        </div>
      )}

      <div className="entries-list">
        <h2>Saved Insurance Policies ({savedEntries.length})</h2>
        {savedEntries.length === 0 ? (
          <p className="no-data">No insurance policies found. Click "Add New Insurance Policy" to get started.</p>
        ) : (
          <div className="cards-grid">
            {savedEntries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="card-header">
                  <h3>{entry.fullName}</h3>
                  <span className={`badge ${getExpiryStatus(entry.coverageEndDate).toLowerCase().replace(' ', '-')}`}>
                    {getExpiryStatus(entry.coverageEndDate)}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Provider:</strong> {entry.insuranceProvider}</p>
                  <p><strong>Policy #:</strong> {entry.policyNumber}</p>
                  <p><strong>Coverage:</strong> {entry.coverageType}</p>
                  <p><strong>Valid Until:</strong> {entry.coverageEndDate}</p>
                  {entry.insuranceHelpline && <p><strong>Helpline:</strong> {entry.insuranceHelpline}</p>}
                </div>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(index)}>✏️ Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelInsuranceVerification;
