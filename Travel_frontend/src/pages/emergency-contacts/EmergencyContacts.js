import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [savedEntries, setSavedEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    contactType: '',
    contactName: '',
    relationship: '',
    phoneNumber: '',
    alternatePhone: '',
    email: '',
    address: '',
    country: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('emergencyContactsEntries');
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
      alert('Emergency contact updated successfully!');
    } else {
      updatedEntries = [...savedEntries, { ...formData, submittedAt: new Date().toISOString() }];
      alert('Emergency contact added successfully!');
    }

    setSavedEntries(updatedEntries);
    localStorage.setItem('emergencyContactsEntries', JSON.stringify(updatedEntries));
    setShowForm(false);
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', fullName: '', contactType: '', contactName: '', relationship: '',
      phoneNumber: '', alternatePhone: '', email: '', address: '', country: '', notes: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(savedEntries[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this emergency contact?')) {
      const updatedEntries = savedEntries.filter((_, i) => i !== index);
      setSavedEntries(updatedEntries);
      localStorage.setItem('emergencyContactsEntries', JSON.stringify(updatedEntries));
      alert('Emergency contact deleted successfully!');
    }
  };

  const handleBack = () => {
    navigate('/employee/safety-check');
  };

  return (
    <div className="emergency-contacts">
      <div className="page-header">
        <FaPhoneAlt style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }} />
        <h1>📞 Emergency Contacts Management</h1>
        <p>Manage your emergency contacts for quick assistance during travel</p>
      </div>

      <div className="default-contacts-box">
        <h3>Default Emergency Numbers:</h3>
        <div className="default-grid">
          <div className="default-item">📞 Police: 100</div>
          <div className="default-item">🚑 Ambulance: 101</div>
          <div className="default-item">🔥 Fire Brigade: 102</div>
          <div className="default-item">🆘 Emergency Helpline: 112</div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{savedEntries.length}</span>
          <span className="stat-label">Total Contacts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{savedEntries.filter(e => e.contactType === 'Personal').length}</span>
          <span className="stat-label">Personal</span>
        </div>
      </div>

      <div className="actions-bar">
        <button className="add-btn" onClick={() => { setShowForm(true); setEditingIndex(null); resetForm(); }}>
          ➕ Add Emergency Contact
        </button>
        <button className="back-button" onClick={handleBack}>← Back to Safety</button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingIndex !== null ? 'Edit Emergency Contact' : 'Add Emergency Contact'}</h2>
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
              <label>Contact Type *
                <select name="contactType" value={formData.contactType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Personal">Personal</option>
                  <option value="Medical">Medical</option>
                  <option value="Company">Company</option>
                  <option value="Embassy">Embassy</option>
                </select>
              </label>
              <label>Contact Name *
                <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required />
              </label>
              <label>Relationship
                <input type="text" name="relationship" value={formData.relationship} onChange={handleChange} placeholder="e.g., Spouse, Parent" />
              </label>
              <label>Phone Number *
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </label>
              <label>Alternate Phone
                <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
              </label>
              <label>Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>Address
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </label>
              <label>Country
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
              </label>
            </div>
            <label>Notes
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
            </label>
            <button type="submit" className="submit-btn">{editingIndex !== null ? 'Update Contact' : 'Add Contact'}</button>
          </form>
        </div>
      )}

      <div className="entries-list">
        <h2>Saved Emergency Contacts ({savedEntries.length})</h2>
        {savedEntries.length === 0 ? (
          <p className="no-data">No emergency contacts found. Click "Add Emergency Contact" to get started.</p>
        ) : (
          <div className="cards-grid">
            {savedEntries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="card-header">
                  <h3>{entry.contactName}</h3>
                  <span className="badge">{entry.contactType}</span>
                </div>
                <div className="card-body">
                  <p><strong>Employee:</strong> {entry.fullName}</p>
                  {entry.relationship && <p><strong>Relationship:</strong> {entry.relationship}</p>}
                  <p><strong>Phone:</strong> {entry.phoneNumber}</p>
                  {entry.alternatePhone && <p><strong>Alt Phone:</strong> {entry.alternatePhone}</p>}
                  {entry.email && <p><strong>Email:</strong> {entry.email}</p>}
                  {entry.country && <p><strong>Country:</strong> {entry.country}</p>}
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

export default EmergencyContacts;
