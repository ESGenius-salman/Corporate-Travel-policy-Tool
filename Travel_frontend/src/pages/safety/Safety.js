import React, { useState, useEffect } from 'react';
import './Safety.css';
import './SafetyModalFix.css';

const Safety = () => {
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [showCovidGuidelines, setShowCovidGuidelines] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showEmbassyDetails, setShowEmbassyDetails] = useState(false);
  
  const [vaccinationData, setVaccinationData] = useState({
    employeeId: '',
    fullName: '',
    age: '',
    dateOfBirth: '',
    vaccinationDate: '',
    notes: ''
  });

  const [vaccinationEntries, setVaccinationEntries] = useState([]);
  const [showVaccinationList, setShowVaccinationList] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  const [insuranceEntries, setInsuranceEntries] = useState([]);
  const [showInsuranceList, setShowInsuranceList] = useState(true);
  const [editingInsuranceIndex, setEditingInsuranceIndex] = useState(null);

  const [insuranceData, setInsuranceData] = useState({
    employeeId: '',
    fullName: '',
    department: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageType: '',
    destinationCoverage: '',
    coverageStartDate: '',
    coverageEndDate: '',
    insuranceHelpline: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  const [emergencyNumbers, setEmergencyNumbers] = useState({
    police: '100',
    ambulance: '101',
    fire: '102',
    personal: '123-456-7890'
  });

  const [isEditingEmergency, setIsEditingEmergency] = useState(false);

  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setEmergencyNumbers(JSON.parse(savedContacts));
    }

    const savedVaccinations = localStorage.getItem('vaccinationEntries');
    if (savedVaccinations) {
      setVaccinationEntries(JSON.parse(savedVaccinations));
    }

    const savedInsurance = localStorage.getItem('insuranceEntries');
    if (savedInsurance) {
      setInsuranceEntries(JSON.parse(savedInsurance));
    }
  }, []);

  const [checklist, setChecklist] = useState([
    { id: '1', item: 'Passport/ID documents verified', checked: true, required: true, category: 'documents' },
    { id: '2', item: 'Visa requirements checked', checked: false, required: true, category: 'documents' },
    { id: '3', item: 'Travel insurance active', checked: true, required: true, category: 'insurance' },
    { id: '4', item: 'Emergency contacts updated', checked: false, required: true, category: 'contacts' },
    { id: '5', item: 'COVID-19 vaccination verified', checked: false, required: true, category: 'health' },
    { id: '6', item: 'Medical requirements reviewed', checked: false, required: false, category: 'health' },
    { id: '7', item: 'Itinerary shared with team', checked: true, required: true, category: 'communication' },
    { id: '8', item: 'Local emergency numbers saved', checked: false, required: false, category: 'contacts' },
    { id: '9', item: 'Travel advisories checked', checked: false, required: false, category: 'safety' },
    { id: '10', item: 'Company travel policy acknowledged', checked: false, required: true, category: 'compliance' }
  ]);

  const handleCheckboxChange = (id) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleVaccinationSubmit = (e) => {
    e.preventDefault();
    let updatedEntries;
    
    if (editingIndex !== null) {
      // Update existing entry
      updatedEntries = vaccinationEntries.map((entry, index) =>
        index === editingIndex ? { ...vaccinationData, updatedAt: new Date().toISOString() } : entry
      );
      alert('Vaccination details updated successfully!');
      setEditingIndex(null);
    } else {
      // Add new entry
      updatedEntries = [...vaccinationEntries, { ...vaccinationData, submittedAt: new Date().toISOString() }];
      alert('Vaccination details submitted successfully!');
    }
    
    setVaccinationEntries(updatedEntries);
    localStorage.setItem('vaccinationEntries', JSON.stringify(updatedEntries));
    setShowVaccinationList(true);
    setVaccinationData({ employeeId: '', fullName: '', age: '', dateOfBirth: '', vaccinationDate: '', notes: '' });
    setChecklist(prev => prev.map(item => item.id === '5' ? { ...item, checked: true } : item));
  };

  const handleEditVaccination = (index) => {
    setVaccinationData(vaccinationEntries[index]);
    setEditingIndex(index);
    setShowVaccinationList(false);
  };

  const handleDeleteVaccination = (index) => {
    if (window.confirm('Are you sure you want to delete this vaccination record?')) {
      const updatedEntries = vaccinationEntries.filter((_, i) => i !== index);
      setVaccinationEntries(updatedEntries);
      localStorage.setItem('vaccinationEntries', JSON.stringify(updatedEntries));
      alert('Vaccination record deleted successfully!');
    }
  };

  const handleAddNew = () => {
    setVaccinationData({ employeeId: '', fullName: '', age: '', dateOfBirth: '', vaccinationDate: '', notes: '' });
    setEditingIndex(null);
    setShowVaccinationList(false);
  };

  const handleInsuranceSubmit = (e) => {
    e.preventDefault();
    let updatedEntries;
    
    if (editingInsuranceIndex !== null) {
      updatedEntries = insuranceEntries.map((entry, index) =>
        index === editingInsuranceIndex ? { ...insuranceData, updatedAt: new Date().toISOString() } : entry
      );
      alert('Insurance details updated successfully!');
      setEditingInsuranceIndex(null);
    } else {
      updatedEntries = [...insuranceEntries, { ...insuranceData, submittedAt: new Date().toISOString() }];
      alert('Insurance details submitted successfully!');
    }
    
    setInsuranceEntries(updatedEntries);
    localStorage.setItem('insuranceEntries', JSON.stringify(updatedEntries));
    setShowInsuranceList(true);
    setInsuranceData({
      employeeId: '', fullName: '', department: '', insuranceProvider: '', policyNumber: '',
      coverageType: '', destinationCoverage: '', coverageStartDate: '', coverageEndDate: '',
      insuranceHelpline: '', emergencyContactName: '', emergencyContactPhone: ''
    });
    setChecklist(prev => prev.map(item => item.id === '3' ? { ...item, checked: true } : item));
  };

  const handleEditInsurance = (index) => {
    setInsuranceData(insuranceEntries[index]);
    setEditingInsuranceIndex(index);
    setShowInsuranceList(false);
  };

  const handleDeleteInsurance = (index) => {
    if (window.confirm('Are you sure you want to delete this insurance record?')) {
      const updatedEntries = insuranceEntries.filter((_, i) => i !== index);
      setInsuranceEntries(updatedEntries);
      localStorage.setItem('insuranceEntries', JSON.stringify(updatedEntries));
      alert('Insurance record deleted successfully!');
    }
  };

  const handleAddNewInsurance = () => {
    setInsuranceData({
      employeeId: '', fullName: '', department: '', insuranceProvider: '', policyNumber: '',
      coverageType: '', destinationCoverage: '', coverageStartDate: '', coverageEndDate: '',
      insuranceHelpline: '', emergencyContactName: '', emergencyContactPhone: ''
    });
    setEditingInsuranceIndex(null);
    setShowInsuranceList(false);
  };

  const handleEmergencySave = () => {
    localStorage.setItem('emergencyContacts', JSON.stringify(emergencyNumbers));
    setIsEditingEmergency(false);
    alert('Emergency contacts saved successfully!');
  };

  const completedItems = checklist.filter(item => item.checked).length;
  const requiredItems = checklist.filter(item => item.required);
  const completedRequired = requiredItems.filter(item => item.checked).length;
  const completionPercentage = Math.round((completedItems / checklist.length) * 100);
  const requiredCompletion = Math.round((completedRequired / requiredItems.length) * 100);

  const isReadyToTravel = completedRequired === requiredItems.length;

  return (
    <div className="page-container">
      <h1 className="page-title">Safety Checklist</h1>
      
      {/* Risk Rating System */}
      <div className="risk-rating-section">
        <h2>🌍 Destination Risk Rating</h2>
        <div className="risk-summary-cards">
          <div className="risk-summary-card low" onClick={() => alert('Low Risk Destinations: Safe for travel')}>
            <div className="risk-icon">🟢</div>
            <div className="risk-info">
              <h3>Low Risk</h3>
              <p>4 destinations</p>
            </div>
          </div>
          <div className="risk-summary-card medium" onClick={() => alert('Medium Risk: Exercise caution')}>
            <div className="risk-icon">🟡</div>
            <div className="risk-info">
              <h3>Medium Risk</h3>
              <p>2 destinations</p>
            </div>
          </div>
          <div className="risk-summary-card high" onClick={() => alert('High Risk: Avoid non-essential travel')}>
            <div className="risk-icon">🔴</div>
            <div className="risk-info">
              <h3>High Risk</h3>
              <p>1 destination</p>
            </div>
          </div>
        </div>

        <div className="risk-destinations">
          <div className="risk-destination-item low-risk">
            <div className="destination-header">
              <span className="risk-badge low">🟢 Low Risk</span>
              <h4>Tokyo, Japan</h4>
            </div>
            <p>Safe travel zone - General safety measures apply</p>
            <span className="update-date">Updated: Oct 2025</span>
          </div>
          <div className="risk-destination-item low-risk">
            <div className="destination-header">
              <span className="risk-badge low">🟢 Low Risk</span>
              <h4>Singapore</h4>
            </div>
            <p>Excellent safety standards - Recommended destination</p>
            <span className="update-date">Updated: Oct 2025</span>
          </div>
          <div className="risk-destination-item medium-risk">
            <div className="destination-header">
              <span className="risk-badge medium">🟡 Medium Risk</span>
              <h4>Delhi, India</h4>
            </div>
            <p>Air quality concerns - Health precautions advised</p>
            <span className="update-date">Updated: Oct 2025</span>
          </div>
          <div className="risk-destination-item medium-risk">
            <div className="destination-header">
              <span className="risk-badge medium">🟡 Medium Risk</span>
              <h4>Paris, France</h4>
            </div>
            <p>Protest activity reported - Stay informed of local conditions</p>
            <span className="update-date">Updated: Oct 2025</span>
          </div>
          <div className="risk-destination-item high-risk">
            <div className="destination-header">
              <span className="risk-badge high">🔴 High Risk</span>
              <h4>Cairo, Egypt</h4>
            </div>
            <p>⚠️ Travel only if essential - Contact HR before booking</p>
            <span className="update-date">Updated: Oct 2025</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Section - Prominent Position */}
      <div className="quick-actions-section">
        <h2>⚡ Quick Actions</h2>
        <div className="action-buttons-grid">
          <button className="action-button vaccination" onClick={() => {
            console.log('Vaccination button clicked');
            setShowVaccinationForm(true);
          }}>
            <span className="action-icon">💉</span>
            <div className="action-text">
              <h3>Vaccination Details</h3>
              <p>Submit vaccination records</p>
            </div>
          </button>
          <button className="action-button insurance" onClick={() => setShowInsuranceForm(true)}>
            <span className="action-icon">🛡️</span>
            <div className="action-text">
              <h3>Insurance Verification</h3>
              <p>Verify travel insurance</p>
            </div>
          </button>
          <button className="action-button covid" onClick={() => setShowCovidGuidelines(true)}>
            <span className="action-icon">😷</span>
            <div className="action-text">
              <h3>COVID Guidelines</h3>
              <p>View health guidelines</p>
            </div>
          </button>
          <button className="action-button emergency" onClick={() => setShowEmergencyContacts(true)}>
            <span className="action-icon">📞</span>
            <div className="action-text">
              <h3>Emergency Contacts</h3>
              <p>Manage emergency numbers</p>
            </div>
          </button>
          <button className="action-button embassy" onClick={() => setShowEmbassyDetails(true)}>
            <span className="action-icon">🏛️</span>
            <div className="action-text">
              <h3>Embassy Details</h3>
              <p>View embassy information</p>
            </div>
          </button>
        </div>
      </div>

      <div className="safety-layout">
        <div className="checklist-section">
          <div className="progress-summary">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-number">{completedItems}/{checklist.length}</span>
                <span className="stat-label">Items Completed</span>
              </div>
              <div className="stat">
                <span className="stat-number">{completionPercentage}%</span>
                <span className="stat-label">Overall Progress</span>
              </div>
              <div className="stat">
                <span className="stat-number">{completedRequired}/{requiredItems.length}</span>
                <span className="stat-label">Required Items</span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            
            <div className={`travel-status ${isReadyToTravel ? 'ready' : 'not-ready'}`}>
              {isReadyToTravel ? (
                <>
                  <span className="status-icon">✅</span>
                  <span>Ready to Travel!</span>
                </>
              ) : (
                <>
                  <span className="status-icon">⚠️</span>
                  <span>Complete required items before traveling</span>
                </>
              )}
            </div>
          </div>

          <div className="checklist-items">
            <h2>Safety Requirements</h2>
            {checklist.map(item => (
              <div key={item.id} className="checklist-item">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <span className="checkmark"></span>
                  <span className={`item-text ${item.checked ? 'completed' : ''}`}>
                    {item.item}
                    {item.required && <span className="required-badge">Required</span>}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="safety-info">
          <div className="info-card compliance-card">
            <h3>Compliance Requirements</h3>
            <div className="compliance-list">
              <div className="compliance-item">
                <span className="compliance-icon">📋</span>
                <div>
                  <strong>Travel Policy</strong>
                  <p>Review company travel guidelines</p>
                </div>
              </div>
              <div className="compliance-item">
                <span className="compliance-icon">💉</span>
                <div>
                  <strong>Health Requirements</strong>
                  <p>COVID-19 and destination-specific vaccinations</p>
                </div>
              </div>
              <div className="compliance-item">
                <span className="compliance-icon">🛡️</span>
                <div>
                  <strong>Insurance Coverage</strong>
                  <p>Verify active travel and health insurance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Emergency Contacts</h3>
            <div className="contact-list">
              <div className="contact-item">
                <strong>Company Emergency Line:</strong>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <strong>Travel Insurance:</strong>
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="contact-item">
                <strong>Local Embassy:</strong>
                <span>+1 (555) 456-7890</span>
              </div>
              <div className="contact-item">
                <strong>Medical Assistance:</strong>
                <span>+1 (555) 789-0123</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Travel Tips</h3>
            <ul className="tips-list">
              <li>Keep copies of important documents in separate locations</li>
              <li>Register with your embassy if traveling internationally</li>
              <li>Check local customs and cultural norms</li>
              <li>Keep emergency cash in local currency</li>
              <li>Share your itinerary with trusted contacts</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>Health & Safety</h3>
            <ul className="tips-list">
              <li>Check vaccination requirements for destination</li>
              <li>Pack necessary medications with prescriptions</li>
              <li>Research local healthcare facilities</li>
              <li>Consider travel health insurance</li>
              <li>Stay hydrated and get adequate rest</li>
            </ul>
          </div>

          <div className="info-card action-card">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button vaccination" onClick={() => {
                console.log('Vaccination button clicked');
                setShowVaccinationForm(true);
              }}>
                💉 Vaccination Details
              </button>
              <button className="action-button insurance" onClick={() => setShowInsuranceForm(true)}>
                🛡️ Insurance Verification
              </button>
              <button className="action-button covid" onClick={() => setShowCovidGuidelines(true)}>
                😷 COVID Guidelines
              </button>
              <button className="action-button emergency" onClick={() => setShowEmergencyContacts(true)}>
                📞 Emergency Contacts
              </button>
              <button className="action-button embassy" onClick={() => setShowEmbassyDetails(true)}>
                🏛️ Embassy Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccination Form Modal */}
      {showVaccinationForm && (
        <div className="modal-overlay" onClick={() => {
          setShowVaccinationForm(false);
          setShowVaccinationList(true);
          setEditingIndex(null);
        }}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💉 Vaccination Verification</h2>
              <button className="close-btn" onClick={() => {
                setShowVaccinationForm(false);
                setShowVaccinationList(true);
                setEditingIndex(null);
              }}>✕</button>
            </div>

            {showVaccinationList ? (
              <div className="vaccination-list-view">
                <div className="list-header">
                  <h3>Vaccination Records ({vaccinationEntries.length})</h3>
                  <button className="add-new-btn" onClick={handleAddNew}>
                    ➕ Add New Record
                  </button>
                </div>

                {vaccinationEntries.length === 0 ? (
                  <div className="no-records">
                    <span className="no-records-icon">💉</span>
                    <p>No vaccination records found</p>
                    <button className="add-first-btn" onClick={handleAddNew}>
                      Add Your First Record
                    </button>
                  </div>
                ) : (
                  <div className="records-list">
                    {vaccinationEntries.map((entry, index) => (
                      <div key={index} className="record-card">
                        <div className="record-header">
                          <h4>{entry.fullName}</h4>
                          <span className="record-badge">✓ Verified</span>
                        </div>
                        <div className="record-details">
                          <div className="record-row">
                            <span className="label">Employee ID:</span>
                            <span className="value">{entry.employeeId}</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Age:</span>
                            <span className="value">{entry.age} years</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Vaccination Date:</span>
                            <span className="value">{new Date(entry.vaccinationDate).toLocaleDateString()}</span>
                          </div>
                          {entry.notes && (
                            <div className="record-row">
                              <span className="label">Notes:</span>
                              <span className="value">{entry.notes}</span>
                            </div>
                          )}
                          <div className="record-row">
                            <span className="label">Submitted:</span>
                            <span className="value">{new Date(entry.submittedAt).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="record-actions">
                          <button className="edit-record-btn" onClick={() => handleEditVaccination(index)}>
                            ✏️ Edit
                          </button>
                          <button className="delete-record-btn" onClick={() => handleDeleteVaccination(index)}>
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleVaccinationSubmit} className="safety-form">
                <button 
                  type="button" 
                  className="back-to-list-btn" 
                  onClick={() => {
                    setShowVaccinationList(true);
                    setEditingIndex(null);
                    setVaccinationData({ employeeId: '', fullName: '', age: '', dateOfBirth: '', vaccinationDate: '', notes: '' });
                  }}
                >
                  ← Back to List
                </button>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee ID *</label>
                  <input type="text" required value={vaccinationData.employeeId} 
                    onChange={(e) => setVaccinationData({...vaccinationData, employeeId: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={vaccinationData.fullName}
                    onChange={(e) => setVaccinationData({...vaccinationData, fullName: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age *</label>
                  <input type="number" required value={vaccinationData.age}
                    onChange={(e) => setVaccinationData({...vaccinationData, age: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" value={vaccinationData.dateOfBirth}
                    onChange={(e) => setVaccinationData({...vaccinationData, dateOfBirth: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Vaccination Date *</label>
                <input type="date" required value={vaccinationData.vaccinationDate}
                  onChange={(e) => setVaccinationData({...vaccinationData, vaccinationDate: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea rows="3" value={vaccinationData.notes}
                  onChange={(e) => setVaccinationData({...vaccinationData, notes: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Vaccination Receipt (PDF/Photo)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
              <button type="submit" className="submit-btn">
                {editingIndex !== null ? '✓ Update Record' : '✓ Submit Vaccination Details'}
              </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Insurance Form Modal */}
      {showInsuranceForm && (
        <div className="modal-overlay" onClick={() => {
          setShowInsuranceForm(false);
          setShowInsuranceList(true);
          setEditingInsuranceIndex(null);
        }}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🛡️ Travel Insurance Verification</h2>
              <button className="close-btn" onClick={() => {
                setShowInsuranceForm(false);
                setShowInsuranceList(true);
                setEditingInsuranceIndex(null);
              }}>✕</button>
            </div>

            {showInsuranceList ? (
              <div className="vaccination-list-view">
                <div className="list-header">
                  <h3>Insurance Records ({insuranceEntries.length})</h3>
                  <button className="add-new-btn" onClick={handleAddNewInsurance}>
                    ➕ Add New Record
                  </button>
                </div>

                {insuranceEntries.length === 0 ? (
                  <div className="no-records">
                    <span className="no-records-icon">🛡️</span>
                    <p>No insurance records found</p>
                    <button className="add-first-btn" onClick={handleAddNewInsurance}>
                      Add Your First Record
                    </button>
                  </div>
                ) : (
                  <div className="records-list">
                    {insuranceEntries.map((entry, index) => (
                      <div key={index} className="record-card">
                        <div className="record-header">
                          <h4>{entry.fullName}</h4>
                          <span className="record-badge">✓ Active</span>
                        </div>
                        <div className="record-details">
                          <div className="record-row">
                            <span className="label">Policy Number:</span>
                            <span className="value">{entry.policyNumber}</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Provider:</span>
                            <span className="value">{entry.insuranceProvider}</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Coverage:</span>
                            <span className="value">{entry.coverageType}</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Valid From:</span>
                            <span className="value">{new Date(entry.coverageStartDate).toLocaleDateString()} - {new Date(entry.coverageEndDate).toLocaleDateString()}</span>
                          </div>
                          <div className="record-row">
                            <span className="label">Helpline:</span>
                            <span className="value">{entry.insuranceHelpline}</span>
                          </div>
                        </div>
                        <div className="record-actions">
                          <button className="edit-record-btn" onClick={() => handleEditInsurance(index)}>
                            ✏️ Edit
                          </button>
                          <button className="delete-record-btn" onClick={() => handleDeleteInsurance(index)}>
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleInsuranceSubmit} className="safety-form">
                <button 
                  type="button" 
                  className="back-to-list-btn" 
                  onClick={() => {
                    setShowInsuranceList(true);
                    setEditingInsuranceIndex(null);
                  }}
                >
                  ← Back to List
                </button>
              <div className="form-row">
                <div className="form-group">
                  <label>Employee ID *</label>
                  <input type="text" required value={insuranceData.employeeId}
                    onChange={(e) => setInsuranceData({...insuranceData, employeeId: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" required value={insuranceData.fullName}
                    onChange={(e) => setInsuranceData({...insuranceData, fullName: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Department / Designation *</label>
                <input type="text" required value={insuranceData.department}
                  onChange={(e) => setInsuranceData({...insuranceData, department: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Insurance Provider *</label>
                  <input type="text" required value={insuranceData.insuranceProvider}
                    onChange={(e) => setInsuranceData({...insuranceData, insuranceProvider: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Policy Number *</label>
                  <input type="text" required value={insuranceData.policyNumber}
                    onChange={(e) => setInsuranceData({...insuranceData, policyNumber: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Coverage Type *</label>
                  <input type="text" required value={insuranceData.coverageType}
                    onChange={(e) => setInsuranceData({...insuranceData, coverageType: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Destination Coverage *</label>
                  <input type="text" required value={insuranceData.destinationCoverage}
                    onChange={(e) => setInsuranceData({...insuranceData, destinationCoverage: e.target.value})} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Coverage Start Date *</label>
                  <input type="date" required value={insuranceData.coverageStartDate}
                    onChange={(e) => setInsuranceData({...insuranceData, coverageStartDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Coverage End Date *</label>
                  <input type="date" required value={insuranceData.coverageEndDate}
                    onChange={(e) => setInsuranceData({...insuranceData, coverageEndDate: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Insurance Helpline *</label>
                <input type="tel" required value={insuranceData.insuranceHelpline}
                  onChange={(e) => setInsuranceData({...insuranceData, insuranceHelpline: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Emergency Contact Name *</label>
                  <input type="text" required value={insuranceData.emergencyContactName}
                    onChange={(e) => setInsuranceData({...insuranceData, emergencyContactName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Emergency Contact Phone *</label>
                  <input type="tel" required value={insuranceData.emergencyContactPhone}
                    onChange={(e) => setInsuranceData({...insuranceData, emergencyContactPhone: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Proof Document (PDF/Photo)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
              <button type="submit" className="submit-btn">
                {editingInsuranceIndex !== null ? '✓ Update Record' : '✓ Submit Insurance Details'}
              </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* COVID Guidelines Modal */}
      {showCovidGuidelines && (
        <div className="modal-overlay" onClick={() => setShowCovidGuidelines(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>😷 COVID-19 Health Guidelines</h2>
              <button className="close-btn" onClick={() => setShowCovidGuidelines(false)}>✕</button>
            </div>
            <div className="guidelines-content">
              <div className="guideline-item">
                <span className="guideline-icon">😷</span>
                <p>Wear a mask in crowded places</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">📏</span>
                <p>Maintain social distancing of at least 6 feet</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🧼</span>
                <p>Wash your hands frequently with soap and water</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🧴</span>
                <p>Use hand sanitizer with at least 60% alcohol</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🚫</span>
                <p>Avoid touching your face, especially eyes, nose, and mouth</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🏠</span>
                <p>Stay home if you feel unwell or have symptoms</p>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">📢</span>
                <p>Follow local health authority guidelines and updates</p>
              </div>
              <div className="emergency-number">
                <strong>Emergency Number:</strong> 123-456-7890
                <p>Call immediately if symptoms are found</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contacts Modal */}
      {showEmergencyContacts && (
        <div className="modal-overlay" onClick={() => setShowEmergencyContacts(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📞 Emergency Contacts</h2>
              <button className="close-btn" onClick={() => setShowEmergencyContacts(false)}>✕</button>
            </div>
            {!isEditingEmergency ? (
              <div className="emergency-contacts-view">
                <div className="emergency-contact-item">
                  <span className="contact-icon">🚓</span>
                  <div>
                    <strong>Police</strong>
                    <p>{emergencyNumbers.police}</p>
                  </div>
                </div>
                <div className="emergency-contact-item">
                  <span className="contact-icon">🚑</span>
                  <div>
                    <strong>Ambulance</strong>
                    <p>{emergencyNumbers.ambulance}</p>
                  </div>
                </div>
                <div className="emergency-contact-item">
                  <span className="contact-icon">🔥</span>
                  <div>
                    <strong>Fire Brigade</strong>
                    <p>{emergencyNumbers.fire}</p>
                  </div>
                </div>
                <div className="emergency-contact-item">
                  <span className="contact-icon">📱</span>
                  <div>
                    <strong>Personal Emergency Contact</strong>
                    <p>{emergencyNumbers.personal}</p>
                  </div>
                </div>
                <button className="edit-btn" onClick={() => setIsEditingEmergency(true)}>
                  ✏️ Edit Contacts
                </button>
              </div>
            ) : (
              <div className="emergency-contacts-edit">
                <div className="form-group">
                  <label>Police</label>
                  <input type="tel" value={emergencyNumbers.police}
                    onChange={(e) => setEmergencyNumbers({...emergencyNumbers, police: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Ambulance</label>
                  <input type="tel" value={emergencyNumbers.ambulance}
                    onChange={(e) => setEmergencyNumbers({...emergencyNumbers, ambulance: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Fire Brigade</label>
                  <input type="tel" value={emergencyNumbers.fire}
                    onChange={(e) => setEmergencyNumbers({...emergencyNumbers, fire: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Personal Contact</label>
                  <input type="tel" value={emergencyNumbers.personal}
                    onChange={(e) => setEmergencyNumbers({...emergencyNumbers, personal: e.target.value})} />
                </div>
                <div className="button-group">
                  <button className="save-btn" onClick={handleEmergencySave}>💾 Save</button>
                  <button className="cancel-btn" onClick={() => setIsEditingEmergency(false)}>✕ Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embassy Details Modal */}
      {showEmbassyDetails && (
        <div className="modal-overlay" onClick={() => setShowEmbassyDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🏛️ Embassy Details</h2>
              <button className="close-btn" onClick={() => setShowEmbassyDetails(false)}>✕</button>
            </div>
            <div className="embassy-list">
              <div className="embassy-item">
                <span className="embassy-flag">🇺🇸</span>
                <div>
                  <strong>US Embassy</strong>
                  <p>123 Embassy St, City, Country</p>
                  <p className="embassy-phone">📞 +1 (555) 100-1000</p>
                </div>
              </div>
              <div className="embassy-item">
                <span className="embassy-flag">🇬🇧</span>
                <div>
                  <strong>UK Embassy</strong>
                  <p>456 Consulate Rd, City, Country</p>
                  <p className="embassy-phone">📞 +44 (555) 200-2000</p>
                </div>
              </div>
              <div className="embassy-item">
                <span className="embassy-flag">🇮🇳</span>
                <div>
                  <strong>Indian Embassy</strong>
                  <p>789 Diplomatic Ln, City, Country</p>
                  <p className="embassy-phone">📞 +91 (555) 300-3000</p>
                </div>
              </div>
              <div className="embassy-item">
                <span className="embassy-flag">🇦🇺</span>
                <div>
                  <strong>Australian Embassy</strong>
                  <p>101 High Comm Ave, City, Country</p>
                  <p className="embassy-phone">📞 +61 (555) 400-4000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Safety;