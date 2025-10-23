//import React from 'react';
/*
const TripRequestCard = ({ trip }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'rejected': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="trip-card">
      <div className="trip-header">
        <h3 className="trip-destination">{trip.destination}</h3>
        <span 
          className="trip-status"
          style={{ backgroundColor: getStatusColor(trip.status) }}
        >
          {trip.status}
        </span>
      </div>
      
      <div className="trip-details">
        <div className="trip-dates">
          <span className="date-label">Travel Dates:</span>
          <span className="date-range">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>
        
        <div className="trip-purpose">
          <span className="purpose-label">Purpose:</span>
          <p className="purpose-text">{trip.purpose}</p>
        </div>
        
        <div className="trip-meta">
          <span className="submitted-date">
            Submitted: {formatDate(trip.submittedDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripRequestCard;*/

//import React from 'react';
import React from 'react';

const TripRequestCard = ({ trip = {} }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return '#27ae60';
      case 'pending': return '#f39c12';
      case 'rejected': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="trip-card">
      <div className="trip-header">
        <h3 className="trip-destination">{trip.destination || 'Unknown Destination'}</h3>
        <span
          className="trip-status"
          style={{ backgroundColor: getStatusColor(trip.status) }}
        >
          {trip.status || 'unknown'}
        </span>
      </div>

      <div className="trip-details">
        <div className="trip-dates">
          <span className="date-label">Travel Dates:</span>
          <span className="date-range">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>

        <div className="trip-purpose">
          <span className="purpose-label">Purpose:</span>
          <p className="purpose-text">{trip.purpose || 'No purpose specified'}</p>
        </div>

        <div className="trip-meta">
          <p><strong>Budget:</strong> ${trip.budget || 0}</p>
          <p><strong>Urgency:</strong> {trip.urgency || 'N/A'}</p>
          <p><strong>Accommodation:</strong> {trip.accommodation || 'N/A'}</p>
          <p><strong>Policy:</strong> {trip.Policy?.name || 'N/A'}</p>
          <p><strong>Emergency Contact:</strong> {trip.emergencyContact || 'N/A'}</p>
          <p className="submitted-date">
            Submitted: {formatDate(trip.submittedDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripRequestCard;
