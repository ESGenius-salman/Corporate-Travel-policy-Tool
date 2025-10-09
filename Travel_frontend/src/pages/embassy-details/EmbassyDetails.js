import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import './EmbassyDetails.css';

const EmbassyDetails = () => {
  const navigate = useNavigate();
  const [savedEntries, setSavedEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    country: '',
    embassyName: '',
    embassyAddress: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    emergencyHotline: '',
    email: '',
    website: '',
    consulateServices: '',
    workingHours: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('embassyDetailsEntries');
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
      alert('Embassy details updated successfully!');
    } else {
      updatedEntries = [...savedEntries, { ...formData, submittedAt: new Date().toISOString() }];
      alert('Embassy details added successfully!');
    }

    setSavedEntries(updatedEntries);
    localStorage.setItem('embassyDetailsEntries', JSON.stringify(updatedEntries));
    setShowForm(false);
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', fullName: '', country: '', embassyName: '', embassyAddress: '',
      city: '', postalCode: '', phoneNumber: '', emergencyHotline: '', email: '',
      website: '', consulateServices: '', workingHours: '', notes: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(savedEntries[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this embassy record?')) {
      const updatedEntries = savedEntries.filter((_, i) => i !== index);
      setSavedEntries(updatedEntries);
      localStorage.setItem('embassyDetailsEntries', JSON.stringify(updatedEntries));
      alert('Embassy record deleted successfully!');
    }
  };

  const handleBack = () => {
    navigate('/employee/safety-check');
  };

  return (
    <div className="embassy-details">
      <div className="page-header">
        <FaBuilding style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }} />
        <h1>🏛️ Embassy Details Management</h1>
        <p>Manage embassy and consulate information for international travel</p>
      </div>

      <div className="default-embassies-box">
        <h3>Common Embassy Contacts:</h3>
        <div className="embassy-grid">
          <div className="embassy-item">🇺🇸 US Embassy: +1-202-501-4444</div>
          <div className="embassy-item">🇬🇧 UK Embassy: +44-20-7499-9000</div>
          <div className="embassy-item">🇮🇳 Indian Embassy: +91-11-2419-8000</div>
          <div className="embassy-item">🇦🇺 Australian Embassy: +61-2-6261-3305</div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{savedEntries.length}</span>
          <span className="stat-label">Total Embassies</span>
        </div>
      </div>

      <div className="actions-bar">
        <button className="add-btn" onClick={() => { setShowForm(true); setEditingIndex(null); resetForm(); }}>
          ➕ Add Embassy Details
        </button>
        <button className="back-button" onClick={handleBack}>← Back to Safety</button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingIndex !== null ? 'Edit Embassy Details' : 'Add Embassy Details'}</h2>
            <button className="close-btn" onClick={() => { setShowForm(false); setEditingIndex(null); resetForm(); }}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>Employee ID *
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
              </label>
              <label>Your Full Name *
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </label>
              <label>Country *
                <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="e.g., United States" />
              </label>
              <label>Embassy Name *
                <input type="text" name="embassyName" value={formData.embassyName} onChange={handleChange} required placeholder="e.g., US Embassy" />
              </label>
              <label>Embassy Address *
                <input type="text" name="embassyAddress" value={formData.embassyAddress} onChange={handleChange} required />
              </label>
              <label>City *
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </label>
              <label>Postal Code
                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </label>
              <label>Phone Number *
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </label>
              <label>Emergency Hotline
                <input type="tel" name="emergencyHotline" value={formData.emergencyHotline} onChange={handleChange} />
              </label>
              <label>Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>Website
                <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
              </label>
              <label>Consulate Services
                <input type="text" name="consulateServices" value={formData.consulateServices} onChange={handleChange} placeholder="e.g., Visa, Passport" />
              </label>
              <label>Working Hours
                <input type="text" name="workingHours" value={formData.workingHours} onChange={handleChange} placeholder="e.g., Mon-Fri 9AM-5PM" />
              </label>
            </div>
            <label>Notes
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
            </label>
            <button type="submit" className="submit-btn">{editingIndex !== null ? 'Update Details' : 'Add Details'}</button>
          </form>
        </div>
      )}

      <div className="entries-list">
        <h2>Saved Embassy Details ({savedEntries.length})</h2>
        {savedEntries.length === 0 ? (
          <p className="no-data">No embassy details found. Click "Add Embassy Details" to get started.</p>
        ) : (
          <div className="cards-grid">
            {savedEntries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="card-header">
                  <h3>{entry.embassyName}</h3>
                  <span className="badge">{entry.country}</span>
                </div>
                <div className="card-body">
                  <p><strong>Employee:</strong> {entry.fullName}</p>
                  <p><strong>Address:</strong> {entry.embassyAddress}, {entry.city}</p>
                  <p><strong>Phone:</strong> {entry.phoneNumber}</p>
                  {entry.emergencyHotline && <p><strong>Emergency:</strong> {entry.emergencyHotline}</p>}
                  {entry.email && <p><strong>Email:</strong> {entry.email}</p>}
                  {entry.workingHours && <p><strong>Hours:</strong> {entry.workingHours}</p>}
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

export default EmbassyDetails;
