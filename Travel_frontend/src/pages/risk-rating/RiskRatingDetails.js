import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './RiskRatingDetails.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const levelColors = {
  Low: '#4caf50',
  Medium: '#ffeb3b',
  High: '#f44336',
};

const levelIcons = {
  Low: '🟢',
  Medium: '🟡',
  High: '🔴',
};

function countByLevel(data, level) {
  return data.filter(d => d.level === level).length;
}

const RiskRatingDetails = () => {
  // Load from localStorage or start empty
  const [riskData, setRiskData] = useState(() => {
    const savedData = localStorage.getItem('riskData');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [modal, setModal] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [form, setForm] = useState({ country: '', city: '', level: 'Low', description: '', date: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Save updates to localStorage
  useEffect(() => {
    localStorage.setItem('riskData', JSON.stringify(riskData));
  }, [riskData]);

  // Filtering and sorting
  let filtered = riskData.filter(d =>
    (filter === 'All' || d.level === filter) &&
    (search === '' || d.country.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase()))
  );

  if (sortBy === 'date') filtered = filtered.sort((a, b) => a.date.localeCompare(b.date));
  if (sortBy === 'level') filtered = filtered.sort((a, b) => ['High', 'Medium', 'Low'].indexOf(a.level) - ['High', 'Medium', 'Low'].indexOf(b.level));

  const openModal = (row) => setModal(row);
  const closeModal = () => setModal(null);

  const openAdmin = () => {
    setAdminMode(true);
    setForm({ country: '', city: '', level: 'Low', description: '', date: '' });
  };
  const closeAdmin = () => setAdminMode(false);

  const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const saveForm = e => {
    e.preventDefault();
    setRiskData([...riskData, form]);
    setAdminMode(false);
  };

  const requestTravel = (row) => {
    if (row.level === 'High') setShowAlert(true);
    else alert('Travel request submitted!');
  };

  const closeAlert = () => setShowAlert(false);

  const findCountryData = (mapCountryName) => {
    if (!mapCountryName) return null;
    const name = mapCountryName.toLowerCase().trim();
    return riskData.find(d => d.country.toLowerCase() === name);
  };

  const countryRisk = {};
  riskData.forEach(d => {
    const key = d.country.toLowerCase();
    countryRisk[key] = d.level;
  });

  return (
    <div className="page-container">
      <button className="btn-back" onClick={() => window.history.back()}>
        ← Back
      </button>

      <h1 className="page-title">Risk Rating System</h1>
      <p className="page-subtitle">Check the latest travel risk levels and safety alerts for upcoming destinations.</p>

      {/* Search and Filter Controls */}
      <div className="controls-bar">
        <input
          placeholder="Search country/city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
          <option value="All">All Risks</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="filter-select">
          <option value="date">Sort by Date</option>
          <option value="level">Sort by Severity</option>
        </select>
      </div>

      {/* Risk Summary Cards */}
      <div className="risk-summary-cards">
        <div className="risk-card low-risk" onClick={() => setFilter('Low')}>
          <div className="risk-icon">🟢</div>
          <div className="risk-label">Low Risk</div>
          <div className="risk-count">{countByLevel(riskData, 'Low')} destinations</div>
        </div>
        <div className="risk-card medium-risk" onClick={() => setFilter('Medium')}>
          <div className="risk-icon">🟡</div>
          <div className="risk-label">Medium Risk</div>
          <div className="risk-count">{countByLevel(riskData, 'Medium')} destinations</div>
        </div>
        <div className="risk-card high-risk" onClick={() => setFilter('High')}>
          <div className="risk-icon">🔴</div>
          <div className="risk-label">High Risk</div>
          <div className="risk-count">{countByLevel(riskData, 'High')} destinations</div>
        </div>
      </div>

      {/* Risk Table */}
      <div className="risk-table-container">
        <table className="risk-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Risk Level</th>
              <th>Description</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx}>
                <td>{row.country}</td>
                <td>{row.city || '-'}</td>
                <td>
                  <span className={`risk-badge ${row.level.toLowerCase()}`}>
                    {levelIcons[row.level]} {row.level}
                  </span>
                </td>
                <td>{row.description}</td>
                <td>{row.date}</td>
                <td>
                  <button className="btn-view" onClick={() => openModal(row)}>View Details</button>
                  <button className="btn-request" onClick={() => requestTravel(row)}>Request Travel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="legend">
        <strong>Legend:</strong>
        <span className="legend-item">🟢 = Safe</span>
        <span className="legend-item">🟡 = Caution</span>
        <span className="legend-item">🔴 = Avoid travel</span>
      </div>

      {/* Admin Controls */}
      <div className="admin-controls">
        <button className="btn-admin" onClick={openAdmin}>
          Add or Update Risk Data
        </button>
      </div>

      {/* Interactive Map */}
      <div className="map-section">
        <div className="map-header"><h3>🗺️ Interactive Risk Map</h3></div>
        <div className="map-instructions">
          <p>Click on any country to view detailed risk assessment and travel advisories</p>
        </div>
        <div className="map-container">
          <ComposableMap projectionConfig={{ scale: 120 }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const name = (geo.properties?.NAME || geo.properties?.name || '').toLowerCase();
                  const risk = countryRisk[name];
                  let fill = '#e0e0e0';
                  if (risk === 'Low') fill = '#4caf50';
                  if (risk === 'Medium') fill = '#ffeb3b';
                  if (risk === 'High') fill = '#f44336';
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke="#fff"
                      style={{ default: { outline: 'none' }, hover: { outline: 'none', cursor: 'pointer', fill: '#999' } }}
                      onClick={() => {
                        const countryName = geo.properties?.NAME || geo.properties?.name || 'Unknown';
                        const found = findCountryData(countryName);
                        setSelectedCountry(found || { 
                          country: countryName, 
                          level: 'No Data', 
                          description: 'No risk assessment available for this country yet.',
                          date: 'N/A'
                        });
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div className="map-legend">
          <span style={{ color: '#4caf50', fontWeight: 600 }}>● Low</span>
          <span style={{ color: '#ffeb3b', fontWeight: 600 }}>● Medium</span>
          <span style={{ color: '#f44336', fontWeight: 600 }}>● High</span>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal.country}{modal.city ? ` - ${modal.city}` : ''}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className={`risk-badge ${modal.level.toLowerCase()}`} style={{ marginBottom: '1rem' }}>
                {levelIcons[modal.level]} {modal.level}
              </div>
              <p><strong>Description:</strong> {modal.description}</p>
              <p><strong>Last Updated:</strong> {modal.date}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {adminMode && (
        <div className="modal-overlay" onClick={closeAdmin}>
          <form className="modal-content" onClick={e => e.stopPropagation()} onSubmit={saveForm}>
            <div className="modal-header">
              <h2>Add/Update Risk Data</h2>
              <button type="button" className="close-btn" onClick={closeAdmin}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Country</label>
                <input name="country" value={form.country} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input name="city" value={form.city} onChange={handleFormChange} />
              </div>
              <div className="form-group">
                <label>Risk Level</label>
                <select name="level" value={form.level} onChange={handleFormChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <input name="description" value={form.description} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input name="date" value={form.date} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" className="btn-secondary" onClick={closeAdmin}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {showAlert && (
        <div className="modal-overlay" onClick={closeAlert}>
          <div className="modal-content alert-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className="alert-icon">⚠️</div>
              <h2>High Risk Destination</h2>
              <p>This destination is flagged as High Risk. Please confirm or contact HR before proceeding.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-danger" onClick={closeAlert}>Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedCountry && (
        <div className="modal-overlay" onClick={() => setSelectedCountry(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedCountry.country}</h2>
              <button className="close-btn" onClick={() => setSelectedCountry(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className={`risk-badge ${selectedCountry.level.toLowerCase()}`} style={{ marginBottom: '1rem' }}>
                {levelIcons[selectedCountry.level] || ''} {selectedCountry.level}
              </div>
              <p>{selectedCountry.description}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setSelectedCountry(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskRatingDetails;
