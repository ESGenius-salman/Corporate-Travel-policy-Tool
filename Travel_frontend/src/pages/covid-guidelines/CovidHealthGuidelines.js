import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMask } from 'react-icons/fa';
import './CovidHealthGuidelines.css';

const CovidHealthGuidelines = () => {
  const navigate = useNavigate();
  const [savedEntries, setSavedEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    testDate: '',
    testType: '',
    testResult: '',
    symptomsReported: '',
    quarantineRequired: '',
    quarantineStartDate: '',
    quarantineEndDate: '',
    vaccinationStatus: '',
    travelDestination: '',
    notes: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('covidGuidelinesEntries');
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
      alert('COVID health record updated successfully!');
    } else {
      updatedEntries = [...savedEntries, { ...formData, submittedAt: new Date().toISOString() }];
      alert('COVID health record added successfully!');
    }

    setSavedEntries(updatedEntries);
    localStorage.setItem('covidGuidelinesEntries', JSON.stringify(updatedEntries));
    setShowForm(false);
    setEditingIndex(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      employeeId: '', fullName: '', testDate: '', testType: '', testResult: '',
      symptomsReported: '', quarantineRequired: '', quarantineStartDate: '', quarantineEndDate: '',
      vaccinationStatus: '', travelDestination: '', notes: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(savedEntries[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this COVID health record?')) {
      const updatedEntries = savedEntries.filter((_, i) => i !== index);
      setSavedEntries(updatedEntries);
      localStorage.setItem('covidGuidelinesEntries', JSON.stringify(updatedEntries));
      alert('COVID health record deleted successfully!');
    }
  };

  const handleBack = () => {
    navigate('/employee/safety-check');
  };

  return (
    <div className="covid-health-guidelines">
      <div className="page-header">
        <FaMask style={{ fontSize: '60px', color: '#4CAF50', marginBottom: '20px' }} />
        <h1>😷 COVID Health Guidelines</h1>
        <p>Track COVID-19 testing, symptoms, and compliance records</p>
      </div>

      <div className="guidelines-box">
        <h3>Important COVID-19 Guidelines:</h3>
        <ul>
          <li>😷 Wear a mask in crowded places</li>
          <li>📏 Maintain social distancing of at least 6 feet</li>
          <li>🧼 Wash your hands frequently with soap and water</li>
          <li>🧴 Use hand sanitizer with at least 60% alcohol</li>
          <li>🚫 Avoid touching your face, especially eyes, nose, and mouth</li>
          <li>🏠 Stay home if you feel unwell or have symptoms</li>
          <li>📢 Follow local health authority guidelines</li>
        </ul>
        <p className="emergency-number">🚨 Emergency Number: 123-456-7890</p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{savedEntries.length}</span>
          <span className="stat-label">Total Records</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{savedEntries.filter(e => e.testResult === 'Negative').length}</span>
          <span className="stat-label">Negative Tests</span>
        </div>
      </div>

      <div className="actions-bar">
        <button className="add-btn" onClick={() => { setShowForm(true); setEditingIndex(null); resetForm(); }}>
          ➕ Add COVID Health Record
        </button>
        <button className="back-button" onClick={handleBack}>← Back to Safety</button>
      </div>

      {showForm && (
        <div className="form-container">
          <div className="form-header">
            <h2>{editingIndex !== null ? 'Edit COVID Health Record' : 'Add COVID Health Record'}</h2>
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
              <label>Test Date *
                <input type="date" name="testDate" value={formData.testDate} onChange={handleChange} required />
              </label>
              <label>Test Type *
                <select name="testType" value={formData.testType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="PCR">PCR</option>
                  <option value="Rapid Antigen">Rapid Antigen</option>
                  <option value="Antibody">Antibody</option>
                </select>
              </label>
              <label>Test Result *
                <select name="testResult" value={formData.testResult} onChange={handleChange} required>
                  <option value="">Select Result</option>
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>
              <label>Symptoms Reported
                <input type="text" name="symptomsReported" value={formData.symptomsReported} onChange={handleChange} placeholder="e.g., Fever, Cough" />
              </label>
              <label>Quarantine Required
                <select name="quarantineRequired" value={formData.quarantineRequired} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              <label>Quarantine Start Date
                <input type="date" name="quarantineStartDate" value={formData.quarantineStartDate} onChange={handleChange} />
              </label>
              <label>Quarantine End Date
                <input type="date" name="quarantineEndDate" value={formData.quarantineEndDate} onChange={handleChange} />
              </label>
              <label>Vaccination Status
                <select name="vaccinationStatus" value={formData.vaccinationStatus} onChange={handleChange}>
                  <option value="">Select Status</option>
                  <option value="Fully Vaccinated">Fully Vaccinated</option>
                  <option value="Partially Vaccinated">Partially Vaccinated</option>
                  <option value="Not Vaccinated">Not Vaccinated</option>
                  <option value="Booster Received">Booster Received</option>
                </select>
              </label>
              <label>Travel Destination
                <input type="text" name="travelDestination" value={formData.travelDestination} onChange={handleChange} />
              </label>
            </div>
            <label>Notes
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"></textarea>
            </label>
            <button type="submit" className="submit-btn">{editingIndex !== null ? 'Update Record' : 'Add Record'}</button>
          </form>
        </div>
      )}

      <div className="entries-list">
        <h2>Saved COVID Health Records ({savedEntries.length})</h2>
        {savedEntries.length === 0 ? (
          <p className="no-data">No COVID health records found. Click "Add COVID Health Record" to get started.</p>
        ) : (
          <div className="cards-grid">
            {savedEntries.map((entry, index) => (
              <div key={index} className="entry-card">
                <div className="card-header">
                  <h3>{entry.fullName}</h3>
                  <span className={`badge ${entry.testResult.toLowerCase()}`}>{entry.testResult}</span>
                </div>
                <div className="card-body">
                  <p><strong>Test Date:</strong> {entry.testDate}</p>
                  <p><strong>Test Type:</strong> {entry.testType}</p>
                  {entry.symptomsReported && <p><strong>Symptoms:</strong> {entry.symptomsReported}</p>}
                  {entry.quarantineRequired === 'Yes' && (
                    <p><strong>Quarantine:</strong> {entry.quarantineStartDate} to {entry.quarantineEndDate}</p>
                  )}
                  {entry.vaccinationStatus && <p><strong>Vaccination:</strong> {entry.vaccinationStatus}</p>}
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

export default CovidHealthGuidelines;
