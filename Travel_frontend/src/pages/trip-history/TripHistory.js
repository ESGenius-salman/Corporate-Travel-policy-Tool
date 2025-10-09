import React, { useState } from 'react';
import './TripHistory.css';

const TripHistory = () => {
  const [trips] = useState([
    {
      id: '1',
      destination: 'New York, USA',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      purpose: 'Client Meeting',
      status: 'completed',
      expenses: 1250.00,
      carbonFootprint: 245,
      documents: ['receipt.pdf', 'report.pdf']
    },
    {
      id: '2',
      destination: 'London, UK',
      startDate: '2024-02-10',
      endDate: '2024-02-15',
      purpose: 'Conference',
      status: 'completed',
      expenses: 2100.00,
      carbonFootprint: 380,
      documents: ['invoice.pdf']
    },
    {
      id: '3',
      destination: 'Tokyo, Japan',
      startDate: '2023-12-05',
      endDate: '2023-12-12',
      purpose: 'Training Workshop',
      status: 'completed',
      expenses: 3200.00,
      carbonFootprint: 520,
      documents: ['expenses.pdf', 'certificate.pdf']
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalExpenses = trips.reduce((sum, trip) => sum + trip.expenses, 0);
  const totalCarbon = trips.reduce((sum, trip) => sum + trip.carbonFootprint, 0);

  const exportReport = (format) => {
    alert(`Exporting trip history as ${format.toUpperCase()}...`);
  };

  return (
    <div className="page-container">
      <div className="history-header">
        <h1 className="page-title">Trip History & Reports</h1>
        <div className="export-buttons">
          <button className="export-btn" onClick={() => exportReport('pdf')}>
            📄 Export PDF
          </button>
          <button className="export-btn" onClick={() => exportReport('excel')}>
            📊 Export Excel
          </button>
        </div>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-icon">✈️</div>
          <div className="stat-content">
            <h3>{trips.length}</h3>
            <p>Total Trips</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>${totalExpenses.toFixed(2)}</h3>
            <p>Total Expenses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div className="stat-content">
            <h3>{totalCarbon} kg</h3>
            <p>CO₂ Emissions</p>
          </div>
        </div>
      </div>

      <div className="history-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by destination or purpose..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Trips
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="trips-list">
        {filteredTrips.map(trip => (
          <div key={trip.id} className="history-trip-card">
            <div className="trip-main">
              <div className="trip-info">
                <h3>{trip.destination}</h3>
                <p className="trip-dates">
                  {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                </p>
                <p className="trip-purpose">{trip.purpose}</p>
              </div>
              <div className="trip-metrics">
                <div className="metric">
                  <span className="metric-label">Expenses</span>
                  <span className="metric-value">${trip.expenses.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Carbon</span>
                  <span className="metric-value">{trip.carbonFootprint} kg CO₂</span>
                </div>
              </div>
            </div>
            <div className="trip-documents">
              <span className="documents-label">Documents:</span>
              {trip.documents.map((doc, idx) => (
                <span key={idx} className="document-badge">📎 {doc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistory;