import React, { useState, useEffect } from 'react';
import './TripHistory.css';
import { tripService } from '../../services/tripService';
import { useAuth } from '../../context/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TripHistory = () => {
  const { token } = useAuth();
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      if (!token) return;
      try {
        const data = await tripService.getMyTrips(token);
        setTrips(data);
      } catch (err) {
        console.error('Failed to fetch trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [token]);

  const filteredTrips = trips.filter(trip => {
    const matchesSearch =
      trip.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.purpose?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalExpenses = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0);
  const totalCarbon = trips.reduce((sum) => sum + 245, 0); // dummy CO₂

  // ✅ Export PDF Functionality
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Trip History Report', 14, 15);

    const tableColumn = ["Destination", "Purpose", "Start Date", "End Date", "Budget ($)", "Urgency"];
    const tableRows = [];

    filteredTrips.forEach(trip => {
      const rowData = [
        trip.destination,
        trip.purpose,
        new Date(trip.startDate).toLocaleDateString(),
        new Date(trip.endDate).toLocaleDateString(),
        trip.budget || 0,
        trip.urgency || '-',
      ];
      tableRows.push(rowData);
    });

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save('trip-history.pdf');
  };

  // ✅ Export Excel Functionality
  const exportExcel = () => {
    const worksheetData = filteredTrips.map(trip => ({
      Destination: trip.destination,
      Purpose: trip.purpose,
      "Start Date": new Date(trip.startDate).toLocaleDateString(),
      "End Date": new Date(trip.endDate).toLocaleDateString(),
      "Budget ($)": trip.budget || 0,
      Urgency: trip.urgency || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trip History");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "trip-history.xlsx");
  };

  return (
    <div className="page-container">
      <div className="history-header">
        <h1 className="page-title">Trip History & Reports</h1>
        <div className="export-buttons">
          <button className="export-btn" onClick={exportPDF}>📄 Export PDF</button>
          <button className="export-btn" onClick={exportExcel}>📊 Export Excel</button>
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
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
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

      {loading ? (
        <p>Loading trip history...</p>
      ) : filteredTrips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="trips-list">
          {filteredTrips.map((trip) => (
            <div key={trip.id || trip._id} className="history-trip-card">
              <div className="trip-main">
                <div className="trip-info">
                  <h3>{trip.destination}</h3>
                  <p className="trip-dates">
                    {new Date(trip.startDate).toLocaleDateString()} -{' '}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                  <p className="trip-purpose">{trip.purpose}</p>
                </div>
                <div className="trip-metrics">
                  <div className="metric">
                    <span className="metric-label">Budget</span>
                    <span className="metric-value">${trip.budget || 0}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Urgency</span>
                    <span className="metric-value">{trip.urgency}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripHistory;
